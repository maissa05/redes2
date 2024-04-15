const dgram = require('dgram');
const readline = require('readline');

const client = dgram.createSocket('udp4');
const PORT = 2020;
const HOST = '192.168.1.2';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendNumbers() {
    rl.question('¿Cuántos números desea enviar? ', (numCount) => {
        const numbers = [];
        let count = 0;

        function sendNumber() {
            rl.question(`Ingrese el número ${count + 1}: `, (num) => {
                const parsedNum = parseFloat(num);
                if (!isNaN(parsedNum)) {
                    numbers.push(parsedNum);
                    count++;
                    if (count < numCount) {
                        sendNumber();
                    } else {
                        const message = Buffer.from(JSON.stringify(numbers));
                        client.send(message, PORT, HOST, (err) => {
                            if (err) {
                                console.log('Error al enviar mensaje:', err);
                            }
                        });
                    }
                } else {
                    console.log('Por favor, ingrese un número válido.');
                    sendNumber();
                }
            });
        }

        sendNumber();
    });
}

client.on('message', (msg) => {
    const sortedNumbers = JSON.parse(msg.toString());
    console.log('Números ordenados de mayor a menor:', sortedNumbers);
    rl.close();
});

// Inicialmente, solicita al usuario que ingrese los números y los envía al servidor
sendNumbers();
