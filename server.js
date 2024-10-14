const http = require('http');
const { Client } = require('pg');

// Конфигурация подключения к базе данных
const client = new Client({
    user: 'postgre',
    host: 'host.docker.internal',  // подключение к базе данных на хосте
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432
});

client.connect();

const server = http.createServer((req, res) => {
    if (req.url === '/db') {
        // Тестирование подключения к базе данных
        client.query('SELECT NOW()', (err, result) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error connecting to the database');
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(`Database connected, server time is: ${result.rows[0].now}`);
            }
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello, Docker!');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
