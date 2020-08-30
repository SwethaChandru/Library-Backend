const mongoose=require('mongoose')

var UserSchema = mongoose.Schema({
    role:{
        type:String,
        default:'user'
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    city:{
        type:String
    },
    DOB:{
        type:Date,
        default:null
    },
    startMember:{
        type:Date,
        default:null
    },
    endMember:{
        type:Date,
        default:null
    }
})

module.exports=mongoose.model("User",UserSchema);