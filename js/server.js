const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const PORT = 2020;
const clients = [];

server.on('listening', () => {
    const address = server.address();
    console.log(`Servidor UDP en funcionamiento en ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    const message = msg.toString();
    const clientInfo = `${rinfo.address}:${rinfo.port}`;
    
    if (!clients.includes(clientInfo)) {
        clients.push(clientInfo);
        console.log(`Nuevo cliente conectado: ${clientInfo}`);
    }

    console.log(`Mensaje de ${clientInfo}: ${message}`);

    clients.forEach((client) => {
        server.send(message, parseInt(client.split(':')[1]), client.split(':')[0]);
    });
});

server.bind(PORT);

