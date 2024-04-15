const dgram = require('dgram');

const server = dgram.createSocket('udp4');
const PORT = 2020;

server.on('listening', () => {
    const address = server.address();
    console.log(`Servidor UDP en funcionamiento en ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
    const numbers = JSON.parse(msg.toString());
    console.log('Números recibidos:', numbers);

    // Ordena los números de mayor a menor
    numbers.sort((a, b) => b - a);

    const sortedNumbers = Buffer.from(JSON.stringify(numbers));
    server.send(sortedNumbers, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.log('Error al enviar mensaje:', err);
        }
    });
});

server.bind(PORT);
