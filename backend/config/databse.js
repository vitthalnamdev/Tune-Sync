
const mongoose=require("mongoose");


//is line se jo bhi data ".env" file me pda hoga wo "process" object me load ho jayega . 
require("dotenv").config();
//ab me .env ka sara data process se access kr skta hu

// ye Database_url to .env me hai to ye process wale object me kaise aya ? 
// hamne to ise process me feed hi nhi kiya

//isiliye hme database_url ko feed krna hai

// how to feed , using dotenv library ka use krke
//first run command for install library = npm i dotenv

const dbConnect = ()=>{
  mongoose.connect(process.env.DATABASE_URL,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
  })
  //this return a promise
  .then(() =>{console.log("db ka connection is successful")})
  .catch((error)=>{
    console.log("issue in db connection");
    console.error(error.massage);
    //iska kya matlab hai ?
    process.exit(1); // Exit the process with a failure code
});
}

module.exports = dbConnect;

