var express=require('express');
var router=express.Router();

const reqCon=require('../controllers/requestController');

router.post('/',reqCon.addrequest);
router.get('/',reqCon.getallIssue);
router.get('/history',reqCon.getAllHistory);
router.get('/allreturn',reqCon.getallreturn);
router.get('/:id',reqCon.getissueReqById);
router.get('/history/:id',reqCon.gethistory);
router.get('/inhand/:id',reqCon.getOnBookById);
router.get('/return/:id',reqCon.getreturnReqById);
router.put('/',reqCon.updateAcceptStatus);
router.put('/return',reqCon.updateReturnStatus);
router.put('/updateReq',reqCon.updateReqStatus);
router.put('/deletehistory',reqCon.deletehistory);
router.put('/deletAllHistory',reqCon.deleteallhistory);


module.exports=router;