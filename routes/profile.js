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

const getUploadedFileUrl = (file) => file ? `/static/${file.filename}` : undefined;

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
        const { name, role, degree, school, stack, status, email, github, linkedin, imgUrl, resumeUrl } = req.body;
        const newProfile = await Profile.create({name, role, degree, school, stack, status, email, github, linkedin, imgUrl, resumeUrl});
        res.status(201).json(newProfile);
    } catch (err){
        console.log(err);
        next();
    }
});

router.put('/:id', async (req, res, next)=>{
    try{
        const { name, role, degree, school, stack, status, email, github, linkedin, imgUrl, resumeUrl } = req.body;
        const profile = await Profile.findByIdAndUpdate(req.params.id, {name, role, degree, school, stack, status, email, github, linkedin, imgUrl, resumeUrl}, {returnDocument:'after'});
        res.status(201).json(profile);
    } catch (err){
        console.log(err);
        next();
    }
});

router.patch('/:id/upload-img', upload.single('img'), async (req, res, next) => {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            { imgUrl: getUploadedFileUrl(req.file) },
            { returnDocument: 'after' }
        );

        res.status(200).json(profile);
    } catch (err) {
        console.log(err);
        next();
    }
});

router.patch('/:id/upload-resume', upload.single('resume'), async (req, res, next) => {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            { resumeUrl: getUploadedFileUrl(req.file) },
            { returnDocument: 'after' }
        );

        res.status(200).json(profile);
    } catch (err) {
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



module.exports = router;