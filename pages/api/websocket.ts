import { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import { io as ClientIO } from 'socket.io-client';

export const config = {
  api: {
    bodyParser: false, // obligatoire pour les WebSocket
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Route /api/websocket hit');

    // On stocke l'instance globale de Socket.io dans res.socket.server.io
    if (!(res.socket as any).server.io) {
        console.log('Initialisation Socket.io serveur Next.js');

        const io = new IOServer((res.socket as any).server, {
        path: '/api/websocket',          // exactement le même path que côté client et Nginx
        cors: {
            origin: ['https://ez-task.fr'], // autorise ton domaine
            credentials: true,
        },
        });

        io.on('connection', (socket) => {
        console.log('Socket connecté :', socket.id);

        const { token } = socket.handshake.auth;
        if (!token) return socket.disconnect(true);

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET!);
        } catch (err) {
            return socket.disconnect(true);
        }

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

        (res.socket as any).server.io = io; // stocker l’instance pour éviter ré-initialisation
    }

    res.end();
}