const mongoose=require('mongoose')

var AuthorSchema = mongoose.Schema({
    name: String
  })

var bookSchema = mongoose.Schema({
    Bookname:{
        type:String,
    },
    Author:{
        type:[AuthorSchema]
    },
    price:{
        type:Number
    },
    Description:{
        type:String
    },
    availabilityStatus:{
        type:String,
        default:"Available"
    },
    issuableStatus:{
        type:String
    }
})

module.exports=mongoose.model("Book",bookSchema);