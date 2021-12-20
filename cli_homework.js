#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const readline = require("readline");
const executionDir = process.cwd();

// command for execution = reader

inquirer
  .prompt([
    {
      name: "dirName",
      type: "input",
      message: "Please provide directory name: ",
    },
  ])
  .then(({ dirName }) => {
    if (dirName) {
      console.log(dirName);
    } else {
      dirName = executionDir;
    }
    func(dirName);
    function func(dirName) {
      let list = fs.readdirSync(dirName);
      inquirer
        .prompt([
          {
            name: "fileName",
            type: "list",
            message: "Select file: ",
            choices: list,
          },
        ])
        .then(({ fileName }) => {
          const isFile = (fileName) => fs.lstatSync(path.join(dirName, fileName)).isFile();
          console.log(isFile(fileName));

          if (isFile(fileName)) {
            inquirer
              .prompt([
                {
                  name: "search",
                  type: "input",
                  message: "Search string: ",
                },
              ])
              .then(({ search }) => {
                if (search.length === 0) {
                  return console.log("Empty search string was given");
                }
                const fullPath = path.join(dirName, fileName);
                const data = fs.createReadStream(fullPath, "utf-8");
                let numStr = 0;
                const readLine = readline.createInterface({
                  input: data,
                });

                readLine.on("line", (line) => {
                  if (line.toString().includes(search)) {
                    console.log(line + "\n");
                    ++numStr;
                  }
                });
                if (numStr === 0) {
                  return console.log("nothing was found");
                }
              });
          } else {
            dirName = path.join(dirName, fileName);
            func(dirName);
          }
        });
    }
  });
