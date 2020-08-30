const mongoose=require('mongoose')

var requestSchema = mongoose.Schema({
    BookId:{
        type:String
    },
    userId:{
        type:String
    },
    AcceptStatus:{
        type:String,
        default:"null"
    },
    ReturnStatus:{
        type:String,
        default:"null"
    },
    IssueReqDate:{
        type:Date
    },
    ReturnReqDate:{
        type:Date
    },
    issuedetail:{
        type:String
    },
    HistoryFlag:{
        type:String,
        default:"true"
    }
})

module.exports=mongoose.model("Request",requestSchema);