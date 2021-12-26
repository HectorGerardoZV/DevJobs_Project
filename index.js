const express = require("express");
const engine = require('express-handlebars');
const router = require("./router/router");
const path = require("path");
const mongoose  = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config({path: "variables.env"});


//Adding server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Creating the handlebars configuration
const hbs = engine.create({ 
    defaultLayout: 'layout',
    helpers: require("./helpers/handlebars") 
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//DB connection
//MongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/DevJobs",{});


//Adding statig files
app.use(express.static(path.join(__dirname,"./public")));

//Adding sessions
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}));



//Adding router
app.use("/",router);

//Starting server
app.listen(process.env.PUERTO, ()=>{
    console.log("Server runing in: "+process.env.PUERTO);
})