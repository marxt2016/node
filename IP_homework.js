const fs = require("fs");
const stream = require("stream");
const readline = require("readline");
const ACCESS_LOG = "./access_lesson.log";

// to execute use command =>   node IP_Homework.js

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

inputStream.on("error", (error) => {
  console.log(
    `An error occured while READING from the file. Error: ${error.message}`
  );
});
