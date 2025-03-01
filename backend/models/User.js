const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            require:true
        },
        image:{
            type:String,
        },
        token:{
            type:String,
        }
    },
    { timestamps: true }

)

module.exports=mongoose.model("User", userSchema);