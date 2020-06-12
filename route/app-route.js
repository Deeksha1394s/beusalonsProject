const express=require('express')
const router=express.Router();
const AppController = require('../controller/app-controller')
const appController=new AppController()

// router.get('/getOrderDetails',(req,res)=>{appController.getOrderDetails(req,res)})

// returns total no of orders placed and average bill subtotal,user wise.
router.get('/getOrderDetails',appController.getOrderDetails)

// updates noOfOrders key present in each user, with its correct value respectively.
router.get('/updateUserDetails',appController.updateUserDetails)
// post/put method is not used since no data in request body and api url was required to perform the given tasks

module.exports=router