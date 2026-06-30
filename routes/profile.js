const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

const profileSchema = new mongoose.Schema({
    name: {type:String, required:true},
    role: {type:String, required:true},
    degree: {type:String, required:true},
    school: {type:String, required:true},
    stack: {type:[String], required:true},
    status: {type:String, required:true},
    email: {type:String, required:true, match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    github: {type:String, required:true},
    linkedin: {type:String, required:true},
    imgUrl: {type:String},
    resumeUrl: {type:String},
});

const Profile = new mongoose.model('Profile', profileSchema);

router.get('/', async (req,res, next)=>{
    try{
        const profile = await Profile.find({});
        res.status(200).json(profile);
    } catch (err){
        console.error(err);
        next();
    }
});

router.get('/:id', async (req,res, next)=>{
    try{
        const profile = await Profile.findById(req.params.id);
        res.status(200).json(profile);
    } catch(err){
        console.error(err);
        next();
    }
});

router.post('/', async (req,res, next)=>{
    try{
        const {...profile} = req.body;
        await Profile.insertOne(profile);
        res.status(201).json(profile);
    } catch (err){
        console.log(err);
        next();
    }
});

router.put('/:id', async (req, res, next)=>{
    try{
        const {...prof} = req.body;
        const profile = await Profile.findByIdAndUpdate(req.params.id, prof, {returnDocument:'after'});
        res.status(201).json(profile);
    } catch (err){
        console.log(err);
        next();
    }
});

router.delete('/:id', async (req, res, next)=>{
    try{
        const profile = await Profile.findByIdAndDelete(req.params.id);
        res.status(201).json(profile);
    } catch (err){
        console.log(err);
        next();
    }
});

//TODO: add files upload
// router.post('/upload/:resource', upload.single('img'), async(req, res, next)=>{

// });

module.exports = router;