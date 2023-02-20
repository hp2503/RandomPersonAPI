const {MongoClient}=require('mongodb');
const url="mongodb://localhost:27017";
const database="randomPersonDB";

const client=new MongoClient(url);

async function mongoConnection(){
  const result=await client.connect();
  const db=result.db(database);
  console.log("Mongo DB connected");
  return db;
}

module.exports={mongoConnection};