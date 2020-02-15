const express = require("express");

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.get("/", function (req, res) {
    console.log("adadaa");
    res.send("Hello World1231231");
});

app.post("/createNewUser", function (req, res) {
    console.log(req.body.username);
    res.send(true);
});

app.post("/deleteUser", function (req, res) {
    res.send(true);
});

app.listen(3000);
console.log("Listening port: 3000")