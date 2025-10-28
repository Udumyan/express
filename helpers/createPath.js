const fs = require("fs").promises;
const path = require("path");


const readFileAsync = async (...args) => {
  return await fs.readFile(
    path.join(__dirname, "..", args.join().replaceAll(",", "/")),
    "utf8"
  );
};

module.exports.readFileAsync = readFileAsync;
