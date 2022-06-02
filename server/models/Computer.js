const mongoose = require("mongoose");
const { Schema } = mongoose;

const systemSchema = new Schema({
  id: Number,
  computer_name: String,
  cpu_brand: String,
  cpu_logical_cores: String,
  cpu_physical_cores: String,
  cpu_type: String,
  hardware_model: String,
  hardware_serial: String,
  hardware_vendor: String,
  host_hostname: String,
  physical_memory: String,
  uuid: String,
});

module.exports = mongoose.model("systeminfo", systemSchema);