require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const Web3 = require("web3");
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

// console.log(web3);
const FROM = "0x879F90de3f5E39567be8C090a33219d30d5EC33e";
const CA = "0xA435F6056A58483247c86CB003a98883C38d01f7";
const Contract = require("./contracts/Test.json");

// setInterval(async () => {
//   web3.eth.getAccounts(console.log);
//   const blockNum = await web3.eth.getBlockNumber();
//   console.log(blockNum);
//   web3.eth.getTransaction(CA).then(console.log);
// }, 1000);

async function test() {
  const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8545");
  const blockNum = await web3.eth.getBlockNumber();
  const blocks = [];
  Array(blockNum)
    .fill(false)
    .forEach(async (_, idx) => {
      const getBlock = await web3.eth.getBlock(idx, true);
      blocks.push(getBlock);
    });

  const instance = await new web3.eth.Contract(Contract.abi, CA);
  // console.log(instance);

  instance.events.allEvents({ fromBlock: "latest" }, (err, result) => {
    console.log("@@@BEGIN@@ : ", result);
  });

  for (let idx = 0; idx < 5; idx++) {
    setTimeout(async () => {
      const method = await instance.methods.foo("11111", "11111").send({
        from: FROM,
      });
      // console.log(idx, method);
    }, 1000);
  }

  setTimeout(() => {
    // console.log(JSON.stringify(blocks));
  }, 2000);
}

test();
