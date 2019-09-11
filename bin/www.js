const http = require("http");
const PORT = 9090;
const serverHeader = require("../app");
const server = http.createServer(serverHeader);
server.listen(PORT);
