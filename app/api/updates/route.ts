import Redis from 'ioredis';

// Pas de cache
export const dynamic = 'force-dynamic';

export async function GET() {
    // Connexion au container Redis
    const redis = new Redis('redis://redis:6379');

    const stream = new ReadableStream({
        async start(controller) {
        const encoder = new TextEncoder();

        const sendMessage = (data: any) => {
            const message = `data: ${JSON.stringify(data)}\n\n`;
            controller.enqueue(encoder.encode(message));
        };

        // Abonnement au canal Redis
        await redis.subscribe('backend-updates');

        const handleMessage = (_channel: string, message: string) => {
            try {
            sendMessage(JSON.parse(message));
            } catch (e) {
            console.error('Impossible de parser le message Redis:', e);
            }
        };

        redis.on('message', handleMessage);

        // Optionnel : log pour debug
        console.log('SSE stream started, listening for Redis messages');
        },
        cancel() {
        // Quand le client se déconnecte
        redis.quit();
        console.log('SSE stream closed, Redis connection quit');
        },
    });

    return new Response(stream, {
        headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        },
    });
}