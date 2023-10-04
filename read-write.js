import { readFile, writeFile } from "fs";
// Syncrhonous doo doo way of doing things
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `what in the hell nuga: ${textIn}`;
// console.log(textOut);

// fs.writeFileSync("./txt/output.txt", textOut);

// Asyncrhonous chad way of doing things
const asyncTextIn = readFile("./txt/start.txt", "utf-8", (err, data1) => {
  const asyncTextIn = readFile(
    `./txt/${data1}.txt`,
    "utf-8",
    (err, data2) => {
      console.log(data2);

      const asyncTextIn = readFile(
        "./txt/appendix.txt",
        "utf-8",
        (err, data3) => {
          console.log(data3);

          writeFile(
            "./txt/final.txt",
            `${data2}\n${data3}`,
            "utf-8",
            (err) => {
              console.log("stuff has been written");
            }
          );
        }
      );
    }
  );
});
console.log("wha");
