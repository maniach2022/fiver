const WebSocket = require("ws").WebSocketServer;
const https = require("https");
const fs = require("fs");

let pc;
const options = {
  key: fs.readFileSync("cert/key.pem"),
  cert: fs.readFileSync("cert/cert.pem"),
};
const server = https.createServer(options, (req, res) => {
  res.writeHead(404);
  res.end();
});
const wss = new WebSocket({ server });

wss.on("connection", (socket) => {
  console.log("New client connected");

  // send a welcome message to the client
  //socket.send('Welcome to the WebSocket server!');

  // handle incoming messages from the client
  socket.on("message", async (message) => {
    console.log("Message Received");
    console.log(message);
  });
  // handle WebSocket connection close event
  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server started on port 8080");
});
