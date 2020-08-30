var express=require('express');
var router=express.Router();

const bookCon=require('../controllers/bookController');

router.post('/',bookCon.addbook);
router.get('/',bookCon.getbook);
router.get('/:id',bookCon.getBookByid);
router.put('/',bookCon.updateBook);
router.put('/status',bookCon.updateAvailStatus);
router.delete('/:id',bookCon.deletebook);


module.exports=router;