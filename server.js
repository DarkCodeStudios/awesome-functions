const http = require('http');
const { exec } = require('child_process');

const PHP_SERVER_PORT = 8000; // Porta su cui il server PHP sarà in ascolto
const NODE_SERVER_PORT = 5000; // Porta su cui il server Node.js sarà in ascolto

// Funzione per avviare il server PHP
const startPHPServer = () => {
    exec(`php -S localhost:${PHP_SERVER_PORT} index.php`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Errore durante l'avvio del server PHP: ${error}`);
            return;
        }
        console.log(`Server PHP avviato:\n${stdout}`);
        if (stderr) {
            console.error(`PHP server stderr:\n${stderr}`);
        }
    });
};

// Avvio del server PHP
startPHPServer();

// Creazione del server Node.js
const server = http.createServer((req, res) => {
    // Inoltra la richiesta HTTP direttamente al server PHP
    const options = {
        hostname: 'localhost',
        port: PHP_SERVER_PORT,
        path: req.url,
        method: req.method,
        headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });
});

// Avvio del server Node.js
server.listen(NODE_SERVER_PORT, () => {
    console.log(`Server Node.js in esecuzione su http://localhost:${NODE_SERVER_PORT}`);
});
