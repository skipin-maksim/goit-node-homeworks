const { request } = require("express");
const express = require("express");
const cors = require("cors");

const contractors = require("./dataBase/contractors.json");
const products = require("./dataBase/products.json");
const orders = require("./dataBase/orders.json");

const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("dataBase")); // пример dataBase

app.get(
  "/contractors",
  (req, res, next) => {
    res.set("Set-Cookie", "my set-cookie");

    // const err = new Error();
    // err.status = 400;
    // next(err);
    next();
  },
  (req, res, next) => {
    console.log("get - /contractors");

    return res.send(contractors);
  }
);

app.post("/contractors", (req, res, next) => {
  //
  console.log(req.body);

  res.send(req.body);
});

app.post("/sing-in", (req, res, next) => {
  console.log(req.body);

  return res.send("request was succesfully handled");
});

app.use((err, req, res, next) => {
  //
  delete err.stack;

  next(err);
});

app.listen(port, () => {
  console.log("Starting listening on port ", port);
});
