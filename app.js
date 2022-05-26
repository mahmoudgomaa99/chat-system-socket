const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Authorization, multipart/form-data"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

require("./middlewares/socket")(io);

server.listen(process.env.PORT || 5000, () => {
  console.log("socket server is listening");
});
