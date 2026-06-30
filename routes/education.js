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
        const education = await Education.find({});
        res.status(200).json(education);
    } catch (err){
        console.error(err);
        next();
    }
});

router.get('/:id', async (req,res, next)=>{
    try{
        const education = await Education.findById(req.params.id);
        res.status(200).json(education);
    } catch(err){
        console.error(err);
        next();
    }
});

router.post('/', async (req,res, next)=>{
    try{
        const {name, uni, description, start, end} = req.body;
        const newEdu = await Education.insertOne({name, uni, description, start, end});
        res.status(201).json(newEdu);
    } catch (err){
        console.log(err);
        next();
    }
});

router.put('/:id', async (req, res, next)=>{
    try{
        const {name, uni, description, start, end} = req.body;
        const education = await Education.findByIdAndUpdate(req.params.id, {name, uni, description, start, end}, {returnDocument:'after'});
        res.status(201).json(education);
    } catch (err){
        console.log(err);
        next();
    }
});

router.delete('/:id', async (req, res, next)=>{
    try{
        const education = await Education.findByIdAndDelete(req.params.id);
        res.status(201).json(education);
    } catch (err){
        console.log(err);
        next();
    }
});

module.exports = router;