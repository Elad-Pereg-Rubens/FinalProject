const express = require("express");
const app = express();
const path = require("path");
const hb = require("express-handlebars");
const request = require("request");
const parser = require("body-parser");
//
//

//AlpahVantage -
// const cors = require("cors");
// app.use(cors());
// app.options("*", cors());

// require("dotenv").config();
// const timePeriod = require("./alphaVantage");
// //
// app.post("/stock", cors(), async (req, res) => {
//     const body = JSON.parse(JSON.stringify(req.body));
//     const { ticker, type } = body;
//     console.log("stocks-api.js 20 | body", body.ticker);
//     const request = await fetch(
//         `https://www.alphavantage.co/query?function=${timePeriod(
//             type
//         )}&symbol=${ticker}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
//     );
//     const data = await request.json();
//     res.json({ data: data });
// });
//
//

//middleware - parser
app.use(parser.urlencoded({ extended: false }));
//
//
//API - SlimFin web-api - https://simfin.com/data/api
//API key = adNorRHSOTmgTnZxraHyTwOLJBrlTZvj

// export to server.js
//API *public* KEY = pk_875d6d7ec4424488b9db96d0437c364f - export to server.js
//https://iexcloud.io/console/tokens
//API request
function getDataApi(callbackAPI, usrSearchResult) {
    // request(
    //     "https://cloud.iexapis.com/stable/stock/" +
    //         usrSearchResult +
    //         "/quote?token=pk_875d6d7ec4424488b9db96d0437c364f",
    request(
        "https://cloud.iexapis.com/stable/stock/" +
            usrSearchResult +
            "/quote?token=pk_875d6d7ec4424488b9db96d0437c364f",
        { json: true },
        (err, res, body) => {
            if (err) {
                return console.log(err);
                // console.log(app.js - Line 29 body);
            }
            if (res.statusCode === 200) {
                console.log("app.js - Line 32 - body is", body);
                // return body;
                callbackAPI(body);
            }
        }
    );
}
//
//
//
//

//Handlebars Middleware
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

//Routes
//HOME GET page Handlebars-route
app.get("/", function (req, res) {
    getDataApi(function (callback) {
        res.render("home", {
            apiInfo: callback,
        });
    }, "fb");
    // console.log(apiData);
});

//HOME - POST page Handlebars-route
app.post("/", function (req, res) {
    getDataApi(function (callback) {
        const searchQ = req.body.ticker;
        res.render("home", {
            apiInfo: callback,
            searchQ: searchQ,
        });
        console.log(
            "app.js - Line 66 - searchQ (req.body.ticker) var is : ",
            searchQ
        );
    }, req.body.ticker);
    // }, req.body.ticker); //    getDataApi(function, req.body.stock));
    // console.log(apiData);
});

//overview GET  page route
app.get("/overview.html", function (req, res) {
    res.render("overview");
});

//static folder
app.use(express.static(path.join(__dirname, "./public")));
//
//
//middleware - image
app.use(express.static("public"));
//
//
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
    console.log("final project - server is listening on " + PORT)
);
