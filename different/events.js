const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", (input) => {
  console.log(`There was a new sale! ${input}`);
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Jonas!");
});

myEmitter.emit("newSale", 9);

//////////////////////////////////////////////////////////////////////////

const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Request received");
  console.log(req.url);

  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another received");
});

server.on("close", () => {
  console.log("Server clsoed;");
});

server.listen(8000, () => {
  console.log("Waiting for requets...");
});
