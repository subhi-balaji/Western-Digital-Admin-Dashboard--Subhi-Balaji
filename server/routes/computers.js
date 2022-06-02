const express = require("express");
const router = express.Router();
const System = require("../models/Computer.js");

router.get("/", async (req, res) => {
  try {
    const allComputers = await System.find(); //find all PC info from database
    console.log(allComputers);
    res.json({ data: allComputers });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
