const express = require("express");
const router = express.Router();
const Search = require("../models/Search");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allComputers = await Search.find(); //find all PC info from database
    const computerByName = allComputers.filter(
      (item, index) => item.host_hostname === id
    ); //find only the posts with the given name?
    res.status(200).json(computerByName);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
