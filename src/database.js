const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/pinterest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Db is conected"))
  .catch((err) => console.error(err));
