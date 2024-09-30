const mongoose = require('mongoose');
async function connection(){
    try{
        await mongoose.connect('mongodb://localhost:27017/batch3-30-sept')
        console.log("Data base connected successfully...")
    }catch(err){
        console.log(err);
    }
}
module.exports = connection;