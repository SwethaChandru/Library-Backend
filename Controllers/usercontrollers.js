const bcrypt=require('bcrypt');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.getUser=(req,res)=>{
    User.find({role:"user"},(err,docs)=>{
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

module.exports.getbyId=(req,res)=>{
    User.findById({_id:req.params.id},(err,docs)=>{
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

module.exports.change=(req,res)=>{
    console.log("enter change password");
    let password;
    bcrypt.hash(req.body.new,10)
                .then(hash=>{
                        password=hash;
                        console.log(password);
                    });
    User.find({_id:req.body.id},(err,docs)=>{
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
            // console.log(docs);
            // console.log(docs[0].password);
            // console.log(req.body.old);
            bcrypt.hash(req.body.old,10)
            .then(hash=>{
                    console.log(hash);
                });
                console.log(req.body.new);
            
            bcrypt.compare(req.body.old,docs[0].password).then(result=>{
                console.log(result)
                if(result)
                {
                    console.log("new password");
                    console.log(password);
                    User.findByIdAndUpdate({_id:req.body.id},
                        {
                            
                            $set:{ "password": password} 
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
                else
                {
                    res.status(401).json({
                        success:false,
                        message:'wrong old password'
                    });
                }
            });
            
           
        }
    })
}

module.exports.addMember=(req,res)=>{
    console.log("enter second delivery status");
    console.log(req.body);
    let startdate=req.body.startdate;
    console.log(startdate.slice(0,10));
    User.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
             
            $set:{ "startMember": req.body.startdate,"endMember":req.body.enddate} 
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

module.exports.add=(req,res)=>{
    console.log("enter signup");
    User.findOne({email:req.body.email},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else{
            if(docs===null){
                bcrypt.hash(req.body.password,10)
                .then(hash=>{
                    const user=new User({
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
                        city:req.body.city,
                        DOB:req.body.dob
                    });
                    user.save((err,items)=>{
                        if(err)
                        {
                            res.status(401).json({
                                success:false,
                                message:'DB error'
                            });
                        }
                        else
                        {
                            res.status(200).json({
                                success:true,
                                message:'succesfully sign up'
                            });
                        }
                    })
                    .catch(err=>{
                        res.status(500).json({
                        error:err
                    })
                })
            })
        }
        else
        {
            res.status(401).json({
                success:false,
                message:"email already present"
            })
        }
    }
})
}

module.exports.adduser=(req,res)=>{
    let fetchedUser;
    User.findOne({email:req.body.email}).then(user=>{
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"email not present"
            });
        }
        fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
               success:false,
               message:"invalid password "
            })
        }
        else
        {
            const token=jwt.sign({},'secret_this_should_be_longer',{expiresIn:'1h'});
            res.status(200).json({
            success:true,
            id:fetchedUser._id,
            token:token,
            role:fetchedUser.role
        });
        }
        
    })
    .catch(err=>{
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Auth failed"
        });
    });
}

