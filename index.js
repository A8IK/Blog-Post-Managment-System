require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 9000;
const bodyParser = require("body-parser")
const cors = require('cors'); 
require ('./models/db');

app.use(bodyParser.json());
app.use(cors());
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.use('/api/posts', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.listen(port, ()=>{
    console.log(`This server is running on port ${port}`);
})

