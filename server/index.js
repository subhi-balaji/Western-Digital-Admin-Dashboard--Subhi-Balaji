const express = require('express')
var cors = require('cors')
const db = require('./db.js')

//connectToMongo();

//copied boilerplate from express
const app = express()
const port = 5000
db.then(() => console.log("DB connected :)")).catch((err) => console.log(err));

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Cannot get / jokes..." });
});

//available routes
//app.use links routes
app.use('/api/auth', require('./routes/auth.js'))
app.use("/computers", require("./routes/computers.js"));
app.use("/search", require("./routes/search.js"));

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`)
})