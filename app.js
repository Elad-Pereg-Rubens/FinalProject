const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 8080;

//Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//set Handlebars-route

app.get("/", function (req, res) {
    res.render("home", {
        stuff: "this is stuff...",
    });
});

//static folder
app.use(express.static(path.join(__dirname, "./public")));

app.listen(PORT, () => console.log("server is listening on " + PORT));
