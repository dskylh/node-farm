import { readFileSync } from "fs";
import { createServer } from "http";
import { parse } from "url";
import slugify from "slugify";
import replaceTemplate from "./modules/replaceTemplate";

// this one executes after the create server because it is a top level function
const data = readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
const overviewTemplate = readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const cardTemplate = readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const productTemplate = readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
const server = createServer((req, res) => {
  const { query, pathname } = parse(req.url, true);

  // const pathName = req.url;
  // OVERVIEW
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHTML = dataObject
      .map((element) => replaceTemplate(cardTemplate, element))
      .join("");
    const output = overviewTemplate.replace("{%PRODUCTCARDS%}", cardsHTML);
    res.end(output);
  }
  // PRODUCT PAGE
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = replaceTemplate(productTemplate, product);
    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  // PAGE NOT FOUND
  else {
    res.writeHead(404, {});
    res.end("page not found 404");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to the port http://localhost:8000");
});
