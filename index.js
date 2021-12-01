const WebSocket = require("ws");
const express = require("express");
const app = express()
const path = require("path");

app.use("/", express.static(path.resolve(__dirname, "../client")))

// http server using node express
const testServer = app.listen(3000)

// websocket server
const wsServer = new WebSocket.Server({
    noServer: true
})

// on connection do ...
wsServer.on("connection", (ws) => {
    // on message event do ...
    ws.on("message", (msg) => {
        wsServer.clients.forEach(function each(client) {
            // if client is ready then ...
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        })
    })
})

// upgrading (http -> websocket) event
testServer.on('upgrade', async function upgrade(request, socket, head) {
    // accepts/rejects 50% of connections. Reload if rejected

    if (Math.random() > 0.5) {
        // closing connection in case of rejection
        return socket.end("HTTP/1.1 401 Unauthorized\r\n", "ascii")
    }

    // send connection if request accepted
    wsServer.handleUpgrade(request, socket, head, function done(ws){
        wsServer.emit("connection", ws, request);
    });
});