const mongoose = require("mongoose");
const { Schema } = mongoose;

const searchSchema = new Schema({
  id: String,
  disk_bytes_read: String,
  disk_bytes_written: String,
  elapsed_time: String,
  host_hostname: String,
  name: String,
  path: String,
  start_time: String,
});

module.exports = mongoose.model("searchinfo", searchSchema);
