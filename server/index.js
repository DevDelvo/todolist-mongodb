const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const tasks = require("./routes/tasks");

const cors = require("cors");

const PORT = 5000;

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, "../client")));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use("/", index);
app.use("/api", tasks);

app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});