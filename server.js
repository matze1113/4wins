const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

let currentPlayer = 'red'; // Startspieler

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // Nachrichten vom Client empfangen
        const move = JSON.parse(message);
        // Hier Spiellogik implementieren und Spielzustand aktualisieren
        // Zum Beispiel: Überprüfung auf gültigen Zug, Spielgewinn usw.
        // Nach der Aktualisierung den neuen Spielzustand an alle Spieler senden:
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ move, currentPlayer }));
            }
        });
        // Spieler wechseln
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    });
});

server.listen(8888, function () {
    console.log('Server is listening on port 8888');
});

