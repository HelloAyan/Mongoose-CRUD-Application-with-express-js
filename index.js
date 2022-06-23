const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routerHandler/todoHandler");


// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose.connect("mongodb://localhost/todos")
    .then( ()=>{
        console.log("Connection successful");
    })
    .catch((err) =>{
        console.log(err);
    })

// Application routes
app.use('/', todoHandler);


// default error handler
function errorHandler(err, req, res, next){
    if(res.errorHandler){
        return next(err);
    }
    res.status(500).json({err: err});
}


app.listen(3000, () =>{
    console.log("App listening at port 3000");
})