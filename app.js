require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const ether = require("./routers/ether");
const web3Manager = require("./web3/web3Manager");
const { connectDb, initDb } = require("./models");

// mongoDb and Web3 init
(async () => {
  const transactionManager = await web3Manager.getTransactionManager();
  transactionManager.init();
  web3Manager.autoContractTanscation();

  connectDb().then(() => {
    // initDb(web3Manager);
  });
})();

app.use(cors({ origin: "*", credentials: false }));

app.use(express.static("public"));

app.listen(3000, () => console.log("SERVER RUNNING"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/web3", ether);
