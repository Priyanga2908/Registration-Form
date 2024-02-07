var express = require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded
    ({extended:true}))
//connect mongodb
const url = "mongodb://0.0.0.0/register"
var db=mongoose.connection
mongoose.connect(url)
  .then((result) => {
    app.listen(3000)
    console.log('Connected to MongoDB');
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.post("/register",(req,res)=>{
    var name=req.body.name;
    var age=req.body.age;
    var email=req.body.email;
    var ph=req.body.ph;
    var gender=req.body.gender;
    var pass=req.body.pass;

    var data={
        "name":name,
        "age":age,
        "email":email,
        "ph":ph,
        "gender":gender,
        "pass":pass,

    }

    db.collection('users').insertOne(data,(err,collection)=>
    {
        if(err)
        {
            throw err;
        }
        console.log('record inserted')
    })

    return res.redirect('signupsucc.html')
})



app.get("/",(req,res)=>{
    res.set({"Allow-acess-Allow-Origin":'*'})
    return res.redirect('index.html')
})
