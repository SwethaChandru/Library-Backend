var express=require('express');
var router=express.Router();

const userCon=require('../controllers/userControllers');

router.post('/signup',userCon.add);
router.post('/',userCon.adduser);
router.get('/',userCon.getUser);
router.get('/:id',userCon.getbyId);
router.put('/',userCon.addMember);
router.put('/change',userCon.change);

module.exports=router;