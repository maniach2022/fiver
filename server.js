const express = require("express");
const path = require("path");
// require('dotenv').config();
const app = express();
const https = require("https");
const fs = require("fs");
const cors = require("cors");
app.use(cors());
const { init } = require("./memcache.js");

(async () => {
  await init();
})();
require("./init/errorHandler")();
// require('./init/jwt')(app);
require("./init/routes")(app);
require("./udp-server/websocket.js");
// require('./init/warnings')();

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(path.resolve(__dirname, "client", "build", "index.html"))
  );
});
const sslOptions = {
  cert: fs.readFileSync("cert/cert.pem"),
  key: fs.readFileSync("cert/key.pem"),
};

const PORT = 4000;
const server = https.createServer(sslOptions, app);

server.listen(PORT, console.log(`listening at port ${PORT}`));
