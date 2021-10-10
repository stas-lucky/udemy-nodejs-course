// const fs = require("fs");

// const res = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(res);

// const textOut = `Abouts avocado: ${res}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File is done");

// // Non blocking[]
// fs.readFile("./txt/start.txt", "utf-8", function (err, data) {
//   console.log(data);
// });

// console.log("Will read file!");

// const getDogPics = async () => {};

////////////////////////////
const http = require("http");

const server = http.createServer((req, res) => {
  const path = req.url;

  if (path === "/" || path === "/overview") {
    res.end("This is an OVERVIEW");
  } else if (path === "/product") {
    res.end("This is the PRODUCT");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello!",
    });
    res.end(`<h1>Page not found</h1>`);
  }
});

const port = 8000;
server.listen(port, null, () => {
  console.log(`Listing on port ${port}`);
});
