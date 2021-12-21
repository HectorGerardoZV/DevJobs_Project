const express = require("express");
const router = require("./router/router");

//Adding server
const app = express();



//Adding router
app.use("/",router);

//Starting server
app.listen(3000, ()=>{
    console.log("Server runing in: "+3000);
})