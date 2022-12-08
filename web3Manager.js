const Web3 = require("web3");

const FROM = "0x879F90de3f5E39567be8C090a33219d30d5EC33e";
const CA = "0x9Bae0edfA21976f5b5476B4d295a0fE1C14D3E36";
const Contract = require("./contracts/Test.json");

// setInterval(async () => {
//   web3.eth.getAccounts(console.log);
//   const blockNum = await web3.eth.getBlockNumber();
//   console.log(blockNum);
//   web3.eth.getTransaction(CA).then(console.log);
// }, 1000);

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8545");

async function blocksFromWeb3(web3) {
  const blockNum = await web3.eth.getBlockNumber();
  const blocks = [];
  const arraySlot = Array(blockNum).fill(false);

  return new Promise((resolve, reject) => {
    Array(blockNum)
      .fill(false)
      .forEach(async (_, idx) => {
        const getBlock = await web3.eth.getBlock(idx, true);
        blocks.push(getBlock);
        if (idx === blockNum - 1) resolve(blocks);
      });
  });
}

class TransactionManager {
  constructor(web3) {
    this.web3 = web3;
    this.init();
  }

  init = async function () {
    this.instance = await new this.web3.eth.Contract(Contract.abi, CA);
    this.subscribeAllEvent();
  };

  subscribeAllEvent = function () {
    this.instance.events.allEvents({ fromBlock: "latest" }, (err, result) => {
      console.log("@@@BEGIN@@ : ", result);
    });
  };
}

const getAllBlocks = async () => blocksFromWeb3(web3);

const getTransactionManager = async () => new TransactionManager(web3);

const autoContractTanscation = async (web3, loopSize = 10, duration = 3000) => {
  const instance = await new web3.eth.Contract(Contract.abi, CA);

  for (let index = 0; index < loopSize; index++) {
    setTimeout(async () => {
      console.log("autoContractTanscation running");
      const method = await instance.methods.foo("11111", "11111").send({
        from: FROM,
      });
      console.log(index);
    }, duration);
  }
};

module.exports = {
  web3,
  getAllBlocks,
  getTransactionManager,
  autoContractTanscation,
};
