const AppService = require("../service/app-service")

class AppController{


    constructor() {
        this.appService=new AppService()
        this.getOrderDetails=this.getOrderDetails.bind(this)
        this.updateUserDetails=this.updateUserDetails.bind(this)
    }

    async getOrderDetails(req, res){
        console.log("APP CONTROLLER getOrderDetails")
        try{
           const response= await this.appService.getOrderDetails()
           res.send({data : response})
        }catch(err){
            res.send( { error: err })}
    }

    async updateUserDetails(req, res){
        console.log("APP CONTROLLER updateUserDetails")
        try{
            const orderDetails= await this.appService.getOrderDetails()
            const response =await this.appService.updateUserDetails(orderDetails)
            res.send({success: true, message : "Successfully updated"})
        }catch(err){
            res.send( { error: err })}
    }


}

module.exports=AppController