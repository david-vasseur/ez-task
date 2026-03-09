"use server"

import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { io as ClientIO } from 'socket.io-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // cast vers 'any' pour accéder à la propriété spécifique de Next.js
    const socketServer = (res.socket as any).server as HTTPServer;

    if (!(socketServer as any).io) {
        console.log('Initialisation Socket.io serveur Next.js');

        const io = new IOServer(socketServer, { path: '/api/websocket' });

        io.on('connection', (socket) => {
            console.log('Frontend connecté via Next.js');

            const { token } = socket.handshake.auth;
            if (!token) {
                console.log('Token manquant');
                socket.disconnect(true);
                return;
            }

            const secret = process.env.JWT_SECRET;
            if (!secret) {
                console.log('JWT_SECRET non défini');
                socket.disconnect(true);
                return;
            }

            try {
                const payload = jwt.verify(token, secret);
                console.log('JWT valide pour user', payload);

                // Connexion au backend interne
                const backendSocket = ClientIO('http://ez-task-backend:8080');

                // Forward des messages
                socket.on('message', (msg) => backendSocket.emit('message', msg));
                backendSocket.on('message', (msg) => socket.emit('message', msg));
            } catch (err) {
                console.log('Token invalide');
                socket.disconnect(true);
            }
        });

        (socketServer as any).io = io; // stocker l’instance pour éviter plusieurs initialisations
    }

    res.end();
}