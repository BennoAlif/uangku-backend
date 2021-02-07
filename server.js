const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
// });

app.get("/", (req, res) => {
  res.json({ message: "Connected to server" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/kategori.routes")(app);
require("./app/routes/transaksi.routes")(app);
require("./app/routes/hutang.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
