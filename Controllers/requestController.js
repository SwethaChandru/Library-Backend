const Request=require('../Models/requestModel');
const book=require('../Models/bookModel');
const router = require('../routes/requestRoute');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.updateAcceptStatus=(req,res)=>{
  Request.findByIdAndUpdate({_id:ObjectId(req.body.id)},
  {
       
      $set:{ "AcceptStatus": req.body.status,"onHandStatus":"true"} 
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

module.exports.updateReturnStatus=(req,res)=>{
  Request.findByIdAndUpdate({_id:ObjectId(req.body.id)},
  {
       
      $set:{ "ReturnStatus": req.body.status} 
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

module.exports.getissueReqById=(req,res)=>{
  console.log("get userby id");
  console.log(req.params.id);
    Request.aggregate([
        { $match: {userId: req.params.id,AcceptStatus:"null"} },
        { $addFields: { BookId: { $toObjectId: '$BookId' } } },
        {
          $lookup: {
            from: 'books',
            localField: 'BookId',
            foreignField: '_id',
            as: 'products'
          }
        },
        { $unwind: '$products' },
      ]).exec((err,docs)=>{
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

module.exports.getallIssue=(req,res)=>{
  console.log("get all issue");
    Request.aggregate([
        { $match: {AcceptStatus:"null"} },
        { $addFields: { BookId: { $toObjectId: '$BookId' } } },
        {
          $lookup: {
            from: 'books',
            localField: 'BookId',
            foreignField: '_id',
            as: 'products'
          }
        },
        { $unwind: '$products' },
        { $addFields: { userId: { $toObjectId: '$userId' } } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'users'
          }
        },
        { $unwind: '$users' },
      ]).exec((err,docs)=>{
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

module.exports.gethistory=(req,res)=>{
  console.log("get all history");
    Request.aggregate([
        { $match: {userId: req.params.id,AcceptStatus:"true",ReturnStatus:"true",HistoryFlag:"true"} },
        { $addFields: { BookId: { $toObjectId: '$BookId' } } },
        {
          $lookup: {
            from: 'books',
            localField: 'BookId',
            foreignField: '_id',
            as: 'products'
          }
        },
        { $unwind: '$products' }
      ]).exec((err,docs)=>{
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

module.exports.getAllHistory=(req,res)=>{
  console.log("get all admin history");
  Request.aggregate([
    { $match: {AcceptStatus:"true",ReturnStatus:"true"} },
    { $addFields: { BookId: { $toObjectId: '$BookId' } } },
    {
      $lookup: {
        from: 'books',
        localField: 'BookId',
        foreignField: '_id',
        as: 'products'
      }
    },
    { $unwind: '$products' },
    { $addFields: { userId: { $toObjectId: '$userId' } } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'users'
          }
      },
    { $unwind: '$users' }
  ]).exec((err,docs)=>{
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

module.exports.getallreturn=(req,res)=>{
  console.log("get all return");
    Request.aggregate([
        { $match: {ReturnStatus:"null"} },
        { $addFields: { BookId: { $toObjectId: '$BookId' } } },
        {
          $lookup: {
            from: 'books',
            localField: 'BookId',
            foreignField: '_id',
            as: 'products'
          }
        },
        { $unwind: '$products' },
        { $addFields: { userId: { $toObjectId: '$userId' } } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'users'
          }
        },
        { $unwind: '$users' },
      ]).exec((err,docs)=>{
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


module.exports.getreturnReqById=(req,res)=>{
    console.log("get return req userby id");
    console.log(req.params.id);
      Request.aggregate([
          { $match: {userId: req.params.id,ReturnStatus:"null"} },
          { $addFields: { BookId: { $toObjectId: '$BookId' } } },
          {
            $lookup: {
              from: 'books',
              localField: 'BookId',
              foreignField: '_id',
              as: 'products'
            }
          },
          { $unwind: '$products' },
          // {$match:{'products.AcceptStatus':"true"}},
        ]).exec((err,docs)=>{
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

module.exports.getOnBookById=(req,res)=>{
    console.log("get userby id");
    console.log(req.params.id);
      Request.aggregate([
          { $match: {userId: req.params.id,AcceptStatus:"true",ReturnStatus:"null"} },
          { $addFields: { BookId: { $toObjectId: '$BookId' } } },
          {
            $lookup: {
              from: 'books',
              localField: 'BookId',
              foreignField: '_id',
              as: 'products'
            }
          },
          { $unwind: '$products' },
        ]).exec((err,docs)=>{
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

module.exports.addrequest=(req,res)=>{
    console.log("enter add request");
    console.log(req.body);
    let newrequest=new Request({
        BookId:req.body.bookid,
        userId:req.body.userid,
        IssueReqDate:req.body.issuedate,
        ReturnReqDate:req.body.returndate,
        issuedetail:req.body.issuedetail,
        // RequestType:req.body.reqtype
    })
    newrequest.save((err,docs)=>{
        if(err)
        {
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            res.send(docs);
        }
    })
}

module.exports.updateReqStatus=(req,res)=>{
    console.log("enter return req");
    console.log(req.body);
    Request.findByIdAndUpdate({_id:ObjectId(req.body.id)},
  {
       
      $set:{ "ReturnReqDate": req.body.date} 
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

module.exports.deletehistory=(req,res)=>{
  console.log("enter delete history");
  console.log(req.body);
  Request.findByIdAndUpdate({_id:ObjectId(req.body.id)},
{
     
    $set:{ "HistoryFlag": "false"} 
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

module.exports.deleteallhistory=(req,res)=>{
  console.log("enter delete all history");
  console.log(req.body);
  Request.updateMany({userId:req.body.id,AcceptStatus:"true",ReturnStatus:"true"},
  {
     
    $set:{ "HistoryFlag": "false"} 
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