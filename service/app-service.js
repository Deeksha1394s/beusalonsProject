
const MongoDb =require("../database/mongodb")
const config = require("../config/config-util")

class AppService{

    constructor() {
        console.log(config.get('MongoDB:url'))
        this.mongoDb=new MongoDb(config.get('MongoDB:url'))
    }
    async getOrderDetails(){
        console.log("APP SERVICE getOrderDetails")
        try{
               let array=[]
               let group={
                   $group: {
                       _id: "$userId",
                       noOfOrders: { $sum: 1 },
                       averageBillValue :{ $avg: "$subtotal" },
                   }
               }
               let lookup={
                   $lookup: {
                       from: "user",
                       localField: "_id",
                       foreignField: "userId",
                       as: "userDetails"
                   }
               }
               let replaceRoot={
                   $replaceRoot: { newRoot: {
                       $mergeObjects: [ { $arrayElemAt: [ "$userDetails", 0 ] }, "$$ROOT" ]}}
                               }


               let project={ $project: {averageBillValue:{ $floor : "$averageBillValue"}, _id:0, name:1,userId:1,noOfOrders:1} }
               let sort ={ $sort : { userId : 1 } }

               array.push(group)
               array.push(lookup)
               array.push(replaceRoot)
               array.push(project)
               array.push(sort)
            const result=await this.mongoDb.findAggregatedRecords('Order',array)
            return result;
        }catch(err){
             throw new Error(err)
        }
    }


    async updateUserDetails(orderDetails){
        console.log("APP SERVICE updateUserDetails")
     try{

        let resposneArray=[]

        for (let index = 0; index < orderDetails.length; index++){
            resposneArray.push(
                this.mongoDb.updateRecord('user',{userId:orderDetails[index].userId}, {$set:{'noOfOrders':orderDetails[index].noOfOrders}})
            )
        }

         const result = await Promise.all(resposneArray)
         return result
     }catch(err){
         throw new Error(err)
     }


    }

}

module.exports=AppService