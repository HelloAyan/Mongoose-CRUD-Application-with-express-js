const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);


// get all the todos
router.get('/', async(req, res) =>{
    await Todo.find({status: 'active'}).select({
        _id: 0,
        _v: 0,
        date: 0,
    }).exec((err) =>{
        if(err, data){
            res.status(500).json({
                //error: "There was a server side error",
                message: err,
            });
        }else{
            res.status(200).json({
                result: data,
                message: " Success ",
            });
        }
    })
})

// get A todo by ID
router.get('/:id', async(req, res) =>{

})


// Post a todo
router.post('/', async(req, res)=>{
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                //error: "There was a server side error",
                message: err,
            });
        }else{
            res.status(200).json({
                message: "Todo was inserted successfully",
            });
        }
    })
})

// post multiple todo
router.post('/all', async(req, res)=>{
    await Todo.insertMany(req.body, (err) =>{
        if(err){
            res.status(500).json({
                //error: "There was a server side error",
                message: err,
            });
        }else{
            res.status(200).json({
                message: "Todo were inserted successfully",
            });
        }
    })

})

// put todo
router.put("/:id", async(req, res)=>{
    const result = await Todo.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            status: 'active'
        }
    }, 
    {
        new: true,
        useFindAndModify: false,
    },
    (err)=>{
        if(err){
            res.status(500).json({
                error: "There was a server side error!",
            });
        }else{
            res.status(200).json({
                message: "Todos was updated successfully",
            })
        }
    })
    console.log(result);
})

// Delete todo
router.delete('/:id', async(req, res)=>{

})

module.exports=router;