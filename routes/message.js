const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const messageSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    subject: {type:String, required:true, maxlength:100},
    message: {type:String, required:true}
});

const Message = new mongoose.model('Message', messageSchema);

router.get('/', async (req,res, next)=>{
    try{
        const message = await Message.find({});
        res.status(200).json(message);
    } catch (err){
        console.error(err);
        next();
    }
});

router.get('/:id', async (req,res, next)=>{
    try{
        const message = await Message.findById(req.params.id);
        res.status(200).json(message);
    } catch(err){
        console.error(err);
        next();
    }
});

router.post('/', async (req,res, next)=>{
    try{
        const {...exp} = req.body;
        await Message.insertOne(exp);
        res.status(201).json(exp);
    } catch (err){
        console.log(err);
        next();
    }
});

router.put('/:id', async (req, res, next)=>{
    try{
        const {...exp} = req.body;
        const message = await Message.findByIdAndUpdate(req.params.id, exp, {returnDocument:'after'});
        res.status(201).json(message);
    } catch (err){
        console.log(err);
        next();
    }
});

router.delete('/:id', async (req, res, next)=>{
    try{
        const message = await Message.findByIdAndDelete(req.params.id);
        res.status(201).json(message);
    } catch (err){
        console.log(err);
        next();
    }
});

module.exports = router;