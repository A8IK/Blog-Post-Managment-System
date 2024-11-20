const mongoose = require('mongoose');
const mongouri = process.env.MONGODB_URI;

mongoose.connect(mongouri)
.then(()=> {
    console.log("Mongodb Connected");
})
.catch((error)=> {
    console.log("Mongodb error:", error.message);
})