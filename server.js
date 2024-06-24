const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Ddos = require('ddos');
const { exec } = require('child_process');
const net = require('net');

const PORT = 5000;
let currentPort = PORT;

const app = express();
const ddos = new Ddos({ burst: 10, limit: 15 });

app.use(ddos.express);

// Esegui il server PHP
const startPHPServer = () => {
    exec('php -S localhost:8000 index.php', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting PHP server: ${error}`);
            return;
        }
        console.log(`PHP server started:\n${stdout}`);
        if (stderr) {
            console.error(`PHP server stderr:\n${stderr}`);
        }
    });
};

// Configurazione del proxy
app.use('/', createProxyMiddleware({ 
    target: 'http://localhost:8000', 
    changeOrigin: true 
}));

// Una semplice route per testare il server
app.get('/test', (req, res) => {
    res.send('Hello, world!');
});

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is already in use, trying another port...`);
            startServer(findAvailablePort());
        } else {
            console.error(`Server error: ${err}`);
        }
    });

    ddos.on('attack', (attack) => {
        console.log(`DDoS attack detected from IP: ${attack}`);
        const newPort = findAvailablePort();
        server.close(() => {
            console.log(`Changing port to ${newPort} due to DDoS attack.`);
            startServer(newPort);
        });
    });
};

const findAvailablePort = () => {
    let port = currentPort + 1;

    const isPortAvailable = (port, callback) => {
        const socket = new net.Socket();

        socket.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                callback(false);
            } else {
                callback(true);
            }
        });

        socket.once('connect', () => {
            socket.destroy();
            callback(false);
        });

        socket.connect(port, '127.0.0.1');
    };

    while (true) {
        isPortAvailable(port, (available) => {
            if (available) {
                currentPort = port;
                return port;
            }
        });
        port++;
    }
};

startPHPServer();
startServer(PORT);
