require("dotenv").config();

const mongoDb = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const ether = require("./routers/ether");

const {
  web3,
  getAllBlocks,
  getTransactionManager,
  autoContractTanscation,
} = require("./web3Manager");

// Web3 init
(async () => {
  const blocks = await getAllBlocks();
  // console.log(blocks);
  const transactionManager = await getTransactionManager();
  autoContractTanscation(web3);
})();

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

app.use(express.static("public"));

app.listen(3000, () => console.log("SERVER RUNNING"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/web3", ether);
