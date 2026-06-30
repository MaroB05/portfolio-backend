const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const experienceSchema = new mongoose.Schema({
    role: {type:String, required:true},
    company: {type:String, required:true},
    description: {type:String, required:true},
    startDate: {type:Date, required:true},
    endDate: {type:Date, required:true},
    isActive: {type:Boolean, default:true}
});

const Experience = new mongoose.model('Experience', experienceSchema);

router.get('/', async (req,res, next)=>{
    try{
        const experience = await Experience.find({});
        res.status(200).json(experience);
    } catch (err){
        console.error(err);
        next();
    }
});

router.get('/:id', async (req,res, next)=>{
    try{
        const experience = await Experience.findById(req.params.id);
        res.status(200).json(experience);
    } catch(err){
        console.error(err);
        next();
    }
});

router.post('/', async (req,res, next)=>{
    try{
        const {role, company, description, startDate, endDate, isActive} = req.body;
        const newExp = await Experience.insertOne({role, company, description, startDate, endDate, isActive});
        res.status(201).json(newExp);
    } catch (err){
        console.log(err);
        next();
    }
});

router.put('/:id', async (req, res, next)=>{
    try{
        const {role, company, description, startDate, endDate, isActive} = req.body;
        const experience = await Experience.findByIdAndUpdate(req.params.id, {role, company, description, startDate, endDate, isActive}, {returnDocument:'after'});
        res.status(201).json(experience);
    } catch (err){
        console.log(err);
        next();
    }
});

router.delete('/:id', async (req, res, next)=>{
    try{
        const experience = await Experience.findByIdAndDelete(req.params.id);
        res.status(201).json(experience);
    } catch (err){
        console.log(err);
        next();
    }
});

module.exports = router;