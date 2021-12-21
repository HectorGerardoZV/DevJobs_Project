const express = require("express");
const engine = require('express-handlebars');
const router = require("./router/router");
const path = require("path");
//Adding server
const app = express();

//Creating the handlebars configuration
const hbs = engine.create({ defaultLayout: 'layout'});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Adding statig files
app.use(express.static(path.join(__dirname,"./public")));

//Adding router
app.use("/",router);

//Starting server
app.listen(3000, ()=>{
    console.log("Server runing in: "+3000);
})