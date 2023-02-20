const {mongoConnection}=require('./database.js');

async function getRandom(person,res,len)
{
  let n=Math.floor(Math.random()*len);
  const result=await person.findOne({id:{$gte:n}});
  if(result==null)
  {
    const result=await person.findOne({id:{$lt:n}});
    await person.deleteOne({id:{$lte:n}});
    console.log(result.name);
    return res.status(200).json({Status:"true",name:result.name});
  }
  await person.deleteOne({id:{$gte:n}});
  console.log(result.name);
  return res.status(200).json({Status:"true",name:result.name});
}

const randomPerson=async(req,res)=>{
  const db=await mongoConnection();
  const person =db.collection('Person');
  let len=await person.countDocuments();
  if(!len)
  {
    const personCopy=db.collection('PersonCopy');
    await personCopy.find().forEach(async (doc)=>{
      await person.insertOne(doc);
    })
  }
  len=await person.countDocuments();
  return getRandom(person,res,len);
}

module.exports={randomPerson};