const express=require('express');
const app=express();
const {randomPerson}=require('./controllers/logic.js');

app.use(express.json());

app.get('/getRandom',randomPerson);

app.listen(3000,'127.0.0.1',()=>{
  console.log("Server Listening at 3000")
})