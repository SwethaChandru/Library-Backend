const book=require('../Models/bookModel');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.addbook=(req,res)=>{
    console.log("enter add book");
    console.log(req.body);
    const newbook=new book({
        Bookname:req.body.name,
        Author:req.body.author,
        price:req.body.price,
        Description:req.body.desc,
        issuableStatus:req.body.issueStatus
    })
    newbook.save((err,docs)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(docs);
        }
    })
}

module.exports.getBookByid=(req,res)=>{
    book.findById({_id:req.params.id},(err,docs)=>{
        if(err)
        {
            console.log(err);
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            if(docs==null)
            {
                res.status(401).json({
                    success:false,
                    message:'no books available on this id'
                });
            }
            else
            {
                res.send(docs);
            }
        }
    })
}

module.exports.updateAvailStatus=(req,res)=>{
    book.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
             
            $set:{ "availabilityStatus": req.body.status} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
                console.log(err);
                res.status(401).json({
                    success:false,
                    message:'DB error'
                });
            }
            else
            {
                res.json(docs);
            }
        })    
}

module.exports.updateBook=(req,res)=>{
    console.log("enter update book");
    console.log(req.body);
    book.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
             
            $set:{ "Bookname": req.body.name,"Author":req.body.author,"price":req.body.price,
            "Description":req.body.desc,"issuableStatus":req.body.issueStatus} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
                console.log(err);
                res.status(401).json({
                    success:false,
                    message:'DB error'
                });
            }
            else
            {
                res.json(docs);
            }
        })   
}

module.exports.deletebook=(req,res)=>{
    book.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        if(err)
        {
            console.log(id);
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            res.status(200).json({
                success:false,
                message:'deleted succesffuly'
            });
        }
    })
}

module.exports.getbook=(req,res)=>{
    book.find({},(err,docs)=>{
        if(err)
        {
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else{
            if(docs===null)
            {
                res.status(401).json({
                    success:false,
                    message:'no books found'
                });
            }
            else
            {
                res.send(docs);
            }
        }
    })
}