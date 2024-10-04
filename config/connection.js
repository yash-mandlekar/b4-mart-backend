const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBURL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));
