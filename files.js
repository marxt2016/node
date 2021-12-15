const fs = require("fs");
const stream = require("stream");
// const fsPromises = require("fs/promises");

const readline = require("readline");

const ACCESS_LOG = "./access.log";

// sync methods

// const data = fs.readFileSync(ACCESS_LOG, {
//   encoding: "utf-8",
// });
// const data = fs.readFileSync(ACCESS_LOG, "utf-8");

// console.log(data);
// console.log(data.toString());

// async
// fs.readFile(ACCESS_LOG, "utf-8", (err, data) => {
//   if (err) console.log(err);
//   else console.log(data);
// });

// fsPromises
//   .readFile(ACCESS_LOG, "utf-8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

const requests = [
  '127.0.0.1 - - [25/Jan/2021:11:10:15 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"',
  '127.0.0.1 - - [16/Jan/2021:11:03:00 -0300] "GET /sitemap.xml HTTP/1.1" 200 0 "-" "curl/7.47.0"',
];

// fs.writeFile(
//   ACCESS_LOG,
//   requests[1] + "\n",
//   {
//     encoding: "utf-8",
//     flag: "a" - means append to existing file content,
//   },
//   (err) => {
//     if (err) console.log(err);
//   }
// );

// fs.appendFile(
//   ACCESS_LOG,
//   requests[1] + "\n",
//   {
//     encoding: "utf-8",
//   },
//   (err) => {
//     if (err) console.log(err);
//   }
// );

//fs.ReadStream()
// const readStream = fs.createReadStream(ACCESS_LOG, {
//   flags: "r",
//   encoding: "utf-8",
//   // autoClose - open/close stream
//   // start - from which byte strat reading
//   // end - where to stop (to make range)
//   highWaterMark: 64,
// });

// readStream.on("data", (chunk) => console.log(chunk));

// const writeStream = fs.createWriteStream(ACCESS_LOG, {
//   encoding: "utf-8",
//   flags: "a",
// });

// requests.forEach((str) => {
//   writeStream.write(str + "\n");
// });
//use line event
// const payedAcc = true;

// const readStream = fs.createReadStream(ACCESS_LOG);
// const tStream = new Transform({
//   transform(chunk, encoding, callback) {
//     if (!payedAcc) {
//       const transformed = chunk
//         .toString()
//         .replace(/\d+\.\d+\.\d+\.\d+/g, "[IP was hided]");
//       this.push(transformed);
//     } else {
//       this.push(chunk);
//     }
//     callback();
//   },
// });

// readStream.pipe(tStream).pipe(process.stdout);
const IP = ["89.123.1.41", "34.48.240.111"];
const inputStream = fs.createReadStream(ACCESS_LOG);

const readLine = readline.createInterface({
  input: inputStream,
});

for (let i = 0; i < IP.length; i++) {
  const outputStream = fs.createWriteStream(`${IP[i]}_requests.log`, {
    flags: "a",
  });
  readLine.on("line", (line) => {
    if (line.toString().includes(IP[i])) {
      outputStream.write(`${line}\n`);
    }
  });
  outputStream.on("error", (error) => {
    console.log(
      `An error occured while WRITING to the file. Error: ${error.message}`
    );
  });
}
// readLine.on("line", (line) => {
//   IP.forEach((IP) => {
//     if (line.toString().includes(IP)) {
//       outputStream.write(`${line}\n`);
//     }
//   });
// });

inputStream.on("error", (error) => {
  console.log(
    `An error occured while READING from the file. Error: ${error.message}`
  );
});
