const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const cluster = require("cluster");
const os = require("os");

// const filePath = path.join(__dirname, "index.html");
// const readStream = fs.createReadStream(filePath);

// const server = http.createServer((req, res) => {
//   // res.end("hello");
//   //   console.log("url ", req.url);
//   //   console.log("method ", req.method);
//   //   console.log("headers ", req.headers);
//   //   res.setHeader("some-header", "some-value");
//   //   res.writeHead(200, "Good", {
//   //     "test-heade": "test-value",
//   //   });
//   //   res.end("End");
//   //_________________________________________
//   // URL routes
//   // if (req.url === "/user") {
//   //   res.write("User found");
//   //   res.end();
//   // } else {
//   //     res.writeHead(404, "404 not found");
//   //     res.write("404");
//   //     res.end();
//   //   }
//   //____________________________________
//   // Method
//   // const response = await fetch('https://examples.com/api/user/authenticate', {
//   // method: 'POST',
//   // headers: {
//   // "Content-Type": "application/json"
//   // },
//   // body: JSON.stringify({
//   // username: this.#username,
//   // password: this.#password,
//   // })
//   // });
//   //   if (req.method === "GET") {
//   //     res.write("Hello GET!");
//   //     res.end();
//   //   } else {
//   //     res.writeHead(405, "405 not allowed");
//   //     res.write("Method NA");
//   //     res.end();
//   //   }
//   // params  ________________________________
//   //   if (req.method === "POST") {
//   //     let data = "";
//   //     req.on("data", (chunk) => (data += chunk));
//   //     req.on("end", () => {
//   //       console.log(data);
//   //       console.log(JSON.parse(data));
//   //       res.writeHead(200, "Ok", {
//   //         "Content-Type": "application/json",
//   //       });
//   //       res.end(data);
//   //     });
//   //   }
//   // URL PARAMS ___________________________________
//   //   const { query } = url.parse(req.url, true);
//   //   console.log(query);
//   //   res.end();

//   // Return HTML in response _________________________
//   if (req.method === "GET") {
//     res.writeHead(200, "Ok", {
//       "Content-Type": "text/html",
//     });
//     readStream.pipe(res);
//   }
// });
// server.listen(5555);

// ______CLUSTERS____________________

if (cluster.isMaster) {
  console.log(`Master ${process.pid}`);
  for (let i = 0; i < os.cpus().length; i++) {
    console.log(`Forking process numb ${i}`);
    cluster.fork();
  }
} else {
  console.log(`Worker ${process.pid} is running`);
  const filePath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(filePath);
  const server = http.createServer((req, res) => {
    setTimeout(() => {
      console.log(`Worker ${process.pid} handling request`);
      res.writeHead(200, "OK", {
        "Content-type": "text/html",
      });
      readStream.pipe(res);
    }, 5000);
  });
  server.listen(5555);
}
