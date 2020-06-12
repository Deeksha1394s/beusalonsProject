const mongoClient = require('mongodb').MongoClient;


class MongoDb{

constructor(url) {
    this.url=url
}

    findAggregatedRecords(collection, array) {
     return new Promise((resolve,reject)=>{
               mongoClient.connect(this.url,(err,db)=>{
                  if(err){
                           reject(err)
                  }else{
                          db.collection(collection).aggregate(array).toArray((err,res)=>{
                              if(err){
                                       reject(err)
                               } else{
                                       db.close()
                                  resolve(res)}
                          })}
               })
       })};


    updateRecord(collection,query,values) {
      return new Promise((resolve,reject)=>{
       mongoClient.connect(this.url,(err,db)=>{
           if(err){ reject(err) }else{
               db.collection(collection).updateOne(query,values,(err,res)=>{
                   if (err) {
                       reject(err);
                   } else {
                       db.close();
                       resolve(res);
                   }
               })
           }})
         })}


}

module.exports=MongoDb
