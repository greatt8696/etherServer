const Web3 = require("web3");
const Contract = require("./contracts/Test.json");

const FROM = "0x879F90de3f5E39567be8C090a33219d30d5EC33e"; // 첫번째 계정
const CA = "0x9Bae0edfA21976f5b5476B4d295a0fE1C14D3E36";

(async () => {
  const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8545");
  const instance = await new web3.eth.getTransaction(CA);
  console.log(instance);
})();
