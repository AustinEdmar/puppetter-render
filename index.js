const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scraper", (req, res) => {
  scrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send("Render esta a rodar !");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
