const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const PORT = 3000;
const app = express();
const projectRouter = require('./routes/project');
const expRouter = require('./routes/experience');
const profileRouter = require('./routes/profile');
const messageRouter = require('./routes/message');

mongoose.connect("mongodb://localhost:27017/portfolio")
        .then(_=>console.log("DB connected!"))
        .catch((err)=>{console.error(err)});


app.use(cors());
app.use(express.json());
app.use('/api/project', projectRouter);
app.use('/api/experience', expRouter);
app.use('/api/profile', profileRouter);
app.use('/api/message', messageRouter);


app.use((req,res)=>{
    res.status(404).json({"error":"Not found!"});
});
app.listen(PORT);