const express = require("express");
const mongoose = require("mongoose");
const app = express();
const loginRoutes = require("./routes/loginRoutes");
const findUserRoutes = require("./routes/findUserRoutes");

const bodyParser = require("body-parser");

mongoose.connect("mongodb://127.0.0.1:27017/config");

//Check if the connection is successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

app.use(bodyParser.json());

app.use("/api/users", loginRoutes);
app.use("/api/users", findUserRoutes);

// Start the server
console.log("rahim");
const PORT = 4500 || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
