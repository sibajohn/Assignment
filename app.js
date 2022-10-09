const express = require('express');
//const ProductData = require('./src/model/Productdata');
const BookData = require('./src/model/Bookdata');
const User = require('./src/model/Userdata');
const cors = require('cors');
const path = require('path');
/*var bodyparser=require('body-parser');*/
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 8080 ;
var app = new express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./dist/frontend'));
  
////app.use(bodyparser.json());

/*book operations. Begin*/
app.post('/api/addbook',verifyToken, function(req,res){
   
  console.log(req.body);
  var book = {       
    title : req.body.book.title,
    author : req.body.book.author,
    image : req.body.book.image,
    about : req.body.book.about
 }   
    
 var book = new BookData(book);//create an instance of your model
 book.save();
});
app.get('/api/books',function(req,res){
  
  BookData.find()
              .then(function(books){
                  res.send(books);
              });
});
app.get('/api/findbook/:id',  (req, res) => {

const id = req.params.id;
BookData.findOne({"_id":id})
  .then((book)=>{
      res.send(book);
  });
})
app.put('/api/updatebook',(req,res)=>{
  console.log(req.body)
  id=req.body._id,
  
    title= req.body.title,
    author = req.body.author,
    image = req.body.image,
    about = req.body.about,
  
  BookData.findByIdAndUpdate({"_id":id},
                              {$set:{"title":title,
                              "author":author,
                              "image":image,
                              "about":about}})
 .then(function(){
     res.send();
 })
})

app.delete('/api/remove/:id',(req,res)=>{

 id = req.params.id;
 BookData.findByIdAndDelete({"_id":id})
 .then(()=>{
     console.log('success')
     res.send();
 })
})
/*book operations. End*/

app.post('/api/login',(req,res) => {
username='siba@gmail.com';
password='123456';
   
    let userData=req.body;
   console.log(userData);
   if(username !== userData.username){
     res.status(401).send('Invalid username');
   }else{
     if(password !== userData.password){
      res.status(401).send('Invalid password');
     }else{
      let payload = {subject: username+password};
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({token});
     }
   }
})

       

     
app.post('/api/adduser',function(req,res){
   
  console.log(req.body);
 

  var user = {       
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    password : req.body.password
 }       
 var user = new User(user);//create an instance of your model
 user.save();
 res.status(200).send();
});

function verifyToken(req,res,next){
  console.log(req);
  if(!req.headers.authorization){
    console.log('verifyToken 1');
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1]
  console.log('Token');
  console.log(token);
  if(token == 'null'){
    console.log('verifyToken 2');
    return res.status(401).send('Unauthorized request');
  }
  let playload = jwt.verify(token,'secretKey')
  console.log(playload)
  if(!playload){
    console.log('verifyToken 3');
    return res.status(401).send('Unauthorized request');
  }
  console.log('verifyToken 4');
  req.userId = playload.subject;
  next()
}
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
 });
app.listen(PORT, function(){
    console.log('listening to port 3000');
});

