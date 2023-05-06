const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once("open", () => console.log("Mongodb connected!"));
db.on("error", () => console.log("Mongodb error!"));

module.exports = db;
