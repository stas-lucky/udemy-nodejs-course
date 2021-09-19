const fs = require("fs");

const res =  fs.readFileSync("./txt/input.txt", "utf-8");
console.log(res);

const textOut = `Abouts avocado: ${res}`;
fs.writeFileSync("./txt/output.txt", textOut);

console.log("File is done");

// Non blocking
fs.readFile("./txt/start.txt", "utf-8", function (err, data) {
    console.log(data);
})

console.log("Will read file!");