const express = require("express");
const path = require("path");

let app = express();

app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
});

const port = process.env.PORT || 3001;

app.listen(port);