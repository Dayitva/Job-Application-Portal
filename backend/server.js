const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require("multer");
const PORT = 4000;

const keys = require("./config/keys");

// routes
var testAPIRouter = require("./routes/testAPI");
var userRouter = require("./routes/Users");
var jobRouter = require("./routes/Jobs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully!");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", userRouter);
app.use("/job", jobRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
