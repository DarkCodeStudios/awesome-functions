const http = require('http');
const { exec } = require('child_process');

const PHP_SERVER_PORT = 8000; 
const NODE_SERVER_PORT = 5000; 

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

startPHPServer();

const server = http.createServer((req, res) => {
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

server.listen(NODE_SERVER_PORT, () => {
    console.log(`Server listening on http://localhost:${NODE_SERVER_PORT}`);
});
