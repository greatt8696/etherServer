require("dotenv").config();

const mongoDb = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const { web3, getAllBlocks, getTransactionManager } = require("./web3Manager");

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

(async () => {
  const blocks = await getAllBlocks();
  // console.log(blocks);
  const transactionManager = await getTransactionManager();
})();
