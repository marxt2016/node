const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// command for execution  node httpHW.js

const server = http.createServer((req, res) => {
  let data = "";
  let dir = process.cwd();

  const { href } = url.parse(req.url, true);

  const isFile = (fileName) => fs.lstatSync(path.join(process.cwd(), fileName)).isFile();
  const isExist = (fileName) => fs.existsSync(path.join(process.cwd(), fileName));
  if (isExist(href.slice(1))) {
    if (isFile(href.slice(1))) {
      const readStream = fs.createReadStream(href.slice(1), {
        flags: "r",
        encoding: "utf-8",
      });
      readStream.on("data", function (chunk) {
        data += chunk;
      });

      readStream.on("end", function () {
        res.write(data);
        res.end();
      });
    } else {
      dir = path.join(dir, href);

      let newList = fs.readdirSync(dir);
      const hrefHTML = (href, item) => {
        if (href === "/") {
          return `<div><a href="${href}${item}">${item}</a></div>`;
        } else {
          return `<div><a href="${href}/${item}">${item}</a></div>`;
        }
      };
      let newResult = newList.map((item) => hrefHTML(href, item));
      res.write(`${newResult.toString().split(",").join("\n")}`);
      res.end();
    }
  } else {
    res.write("<h1>Please provide correct path</h1>");
    res.end();
  }
});
server.on("error", (err) => console.log(err));
server.listen(5555);
