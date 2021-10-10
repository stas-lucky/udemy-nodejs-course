const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

//console.log(app.get("env")); // From OS
//console.log(process.env); // From process

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
