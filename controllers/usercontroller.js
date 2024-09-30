const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds =10;
async function signUp(req,res){
    try{
        //console.log(req.body,'req.body');
        let password = bcrypt.hashSync(req.body.password,saltRounds);
       // console.log(password,'password')
        let user = new User(req.body);
        user.password = password;
        await user.save();
        //res.end("<h1>sign up is in process</h1>");
       // res.end("<h1> Sign up Successfully..... </h1>")
       res.redirect('/')  // it tell path will be 
    }catch(err){
        console.log(err);
    }
}
async function doLogin(req,res){
    try{
        console.log(req.body,'req.body');
        let user = await User.findOne({email:req.body.email})
        if(!user){
            req.end("<h1>no such user exist")
        }else{
            let isMatch = await bcrypt.compare(req.body.password,user.password)
            if(isMatch){
                res.end("<h1>login successfull</h1>")
            }else{
                res.end('<h1>incorrect password')
            }
        }
      //  res.end("<h1> login is in process</h1>")
    }catch(err){
        console.log(err)
    }
}
module.exports = {
    signUp,
    doLogin
}