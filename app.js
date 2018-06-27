var express = require("express"),
app = express();

const passportSetup = require("./config/passport-setup");
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
    // 1 day in milliseconds
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connection made to mongodb');
});

var todoRoutes = require("./routes/todos.js");
var authRoutes = require("./routes/auth-routes");
app.get("/", (req, res) => {
    res.redirect("/todos");
});
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);

app.listen(3000);