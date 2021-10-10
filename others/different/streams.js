const fs = require("fs");
const http = require("http");

const port = 8000;
const server = http.createServer();

server.on("request", (req, res) => {
  console.log(`[${new Date().toISOString()}] Request received ${req.url}`);

  // Solution 1

  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // Solution 2: Streams
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });

  // readable.on("error", (err) => {
  //   console.error(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });

  // Solution 3
  const readable = fs.createReadStream("test-file.txt");
  // readableSource.pipe(writeableDestStream)
  readable.pipe(res);
});

server.listen(port, null, () => {
  console.log(`Listening on port ${port}`);
});
