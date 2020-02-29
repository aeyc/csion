const express = require("express");
const cors = require('cors')

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cors())

app.get("/", function (req, res) {
    console.log("adadaa");
    res.send("Hello World1231231");
});

app.post("/createNewUser", function (req, res) {
    console.log("asdasd");
    res.send(true);
});

app.post("/deleteUser", function (req, res) {
    res.send(true);
});

app.post("/auth", function (req, res) {
    res.send(true);
});

app.get("/userInfo", function (req, res) {
    res.send(true);
});


app.listen(3000);
console.log("Listening port: 3000");