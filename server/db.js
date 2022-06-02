const mongoose = require('mongoose');


// const connectToMongo = async () => {
//     await mongoose.connect(mongoURI, {   
//     })
//     console.log("connected to mongo")
// }

module.exports = mongoose.connect("mongodb://127.0.0.1:27017/dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

