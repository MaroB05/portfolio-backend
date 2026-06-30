const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const projectSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    technologies: {type: [String], required:true},
    isActive: {type:Boolean, default:true}
});

const Project = new mongoose.model('Project', projectSchema);

router.get('/', async (req,res, next)=>{
    try{
        const projects = await Project.find({});
        res.status(200).json(projects);
    } catch (err){
        console.error(err);
        next();
    }
});

router.get('/:id', async (req,res, next)=>{
    try{
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch(err){
        console.error(err);
        next();
    }
});


router.post('/', async (req,res, next)=>{
    try{
        const {name, description, technologies} = req.body;
        await Project.insertOne({name, description, technologies});
        res.status(201).json({name, description, technologies});
    } catch (err){
        console.log(err);
        next();
    }
});


router.put('/:id', async (req, res, next)=>{
    try{
        const {name, description, technologies} = req.body;
        const project = await Project.findByIdAndUpdate(req.params.id, {name, description, technologies}, {returnDocument:'after'});
        res.status(201).json(project);
    } catch (err){
        console.log(err);
        next();
    }
});

router.delete('/:id', async (req, res, next)=>{
    try{
        const project = await Project.findByIdAndDelete(req.params.id);
        res.status(201).json(project);
    } catch (err){
        console.log(err);
        next();
    }
});

module.exports = router;