const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const readline = require('readline');

const HOST = '192.168.1.2';
const PORT = 2020;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Ingrese su nombre de usuario: ', (username) => {
    rl.setPrompt('Mensaje: ');
    rl.prompt();

    rl.on('line', (line) => {
        const message = `${username}: ${line}`;
        client.send(message, PORT, HOST, (err) => {
            if (err) {
                console.log('Error al enviar mensaje:', err);
            }
        });
        rl.prompt();
    });
});

client.on('message', (msg, rinfo) => {
    console.log(msg.toString());
});

client.on('error', (err) => {
    console.log('Error en el cliente:', err);
});

