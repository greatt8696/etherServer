const router = require("express").Router();
const tempBlocks = require("../blocks");
const event = require("../events.json");

router.get("/getBlocks", (req, res) => {
  res.send(tempBlocks);
});

router.get("/getEvent", (req, res) => {
  res.send(event);
});
