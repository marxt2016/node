#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
//const readline = require("readline");
const inquirer = require("inquirer");
// const yargs = require("yargs");

// const options = yargs.usage("Usage: -p <path to file>").options("p", {
//   //alias: ["path", "someotheroptionName"],
//   alias: "path",
//   describe: "Path to file",
//   type: "string",
//   demandOption: true,
// }).argv;
// console.log(options);

// npm run start -- -p ./access_lesson.log
// const data = fs.readFileSync(options.path, "utf-8");
// console.log(data);

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// rl.question("Enter path:  ", (filePath) => {
//   console.log(filePath);
//   rl.question("Enter encoding:  ", (encoding) => {
//     console.log(encoding);
//     rl.close();
//   });
// });

// const question = async (question) => new Promise((resolve) => rl.question(question, resolve));

// (async () => {
//   const filePath = await question("Enter path:  ");
//   const encoding = await question("Enter encoding:  ");

//   const data = fs.readFileSync(filePath, encoding);
//   console.log(data);
//   rl.close();
// })();

const isFile = (path) => fs.lstatSync(path).isFile();
const executionDir = process.cwd();
const list = fs.readdirSync(executionDir).filter(isFile);

inquirer
  .prompt([
    {
      name: "fileName",
      type: "list", //input, number, list, confirm, checkbox, password
      message: "Select file: ",
      //choices: ["a", "b", "c"],
      choices: list,
    },
  ])
  .then(({ fileName }) => {
    const fullPath = path.join(executionDir, fileName);
    const data = fs.readFileSync(fullPath, "utf-8");
    console.log(data);
  });
