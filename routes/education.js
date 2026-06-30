const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const educationSchema = new mongoose.Schema({
    name: {type:String, required:true},
    uni: {type:String, required:true, maxlength:100},
    description: {type:String, required:true},
    start: {type:Date, required:true},
    end: {type:Date, required:true}
});

const Education = new mongoose.model('Education', educationSchema);

router.get('/', async (req,res, next)=>{
    try{
        const education = await Message.find({});
        res.status(200).json(education);
    } catch (err){
        console.error(err);
        next();
    }
});

router.get('/:id', async (req,res, next)=>{
    try{
        const education = await Message.findById(req.params.id);
        res.status(200).json(education);
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
        const education = await Message.findByIdAndUpdate(req.params.id, exp, {returnDocument:'after'});
        res.status(201).json(education);
    } catch (err){
        console.log(err);
        next();
    }
});

router.delete('/:id', async (req, res, next)=>{
    try{
        const education = await Message.findByIdAndDelete(req.params.id);
        res.status(201).json(education);
    } catch (err){
        console.log(err);
        next();
    }
});

module.exports = router;