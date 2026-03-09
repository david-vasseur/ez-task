import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { io as ClientIO } from 'socket.io-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Route /api/websocket hit');

    // cast vers 'any' pour accéder à la propriété spécifique de Next.js
    const socketServer = (res.socket as any).server as HTTPServer;

    if (!(socketServer as any).io) {
        console.log('Initialisation Socket.io serveur Next.js');

        const io = new IOServer(socketServer, { path: '/api/websocket/' });

        io.on('connection', (socket) => {
            const { token } = socket.handshake.auth;
            if (!token) return socket.disconnect(true);

            const payload = jwt.verify(token, process.env.JWT_SECRET!);

            // Maintenant on a l'userId et le prénom
            const userId = socket.handshake.query.userId;
            const userFirstName = socket.handshake.query.userFirstName;

            // Connection vers backend
            const backendSocket = ClientIO('http://ez-task-backend:8080', {
                query: { userId, userFirstName },
            });

            // Forward des messages
            socket.on('message', (msg) => backendSocket.emit('message', msg));
            backendSocket.on('message', (msg) => socket.emit('message', msg));
        });

        (socketServer as any).io = io; // stocker l’instance pour éviter plusieurs initialisations
    }

    res.end();
}