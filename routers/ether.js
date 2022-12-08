const router = require("express").Router();
const tempBlocks = require("../blocks");
const event = require("../events.json");
const { getAllBlocks } = require("../web3Manager");

router.get("/getBlocks", async (req, res) => {
  const allBlockFromWeb3 = await getAllBlocks();
  res.send(allBlockFromWeb3);
});

router.get("/getBlock/:number", async (req, res) => {
  const { number } = req.params;
  const allBlockFromWeb3 = await getAllBlocks();
  res.send(allBlockFromWeb3[number]);
});

router.get("/getBlock/:number", async (req, res) => {
  const { number } = req.params;
  const allBlockFromWeb3 = await getAllBlocks();
  res.send(allBlockFromWeb3[number]);
});

router.get("/getEvent", async (req, res) => {
  res.send(event);
});

module.exports = router;
