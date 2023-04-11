//jshint ESversion 6
require('dotenv').config();
const mongoose=require('mongoose');
const express = require ('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const app = express()
const StudentsModel=require('./module/mongooseConnect.js')
const multer=require('multer')
const path = require('path');
const fs=require('fs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const applicationSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    fatherName:String,
    matherName:String,
    email:String,
    age:String,
    gender:String,
    about:String,
    dob:String,
    address:String,
    education:String,
    lastinstitution:String,
    yearsstudied:String,
    whyyouleft:String,
    lastdegree:String,
    percentageinlastdegree:String,
    profilePicture:String
})
const ApplicationModel=mongoose.model('application',applicationSchema)
// Setting multer up

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
// All about setting multer up
app.get('/', (req, res) => 
res.render('index'))

app.get('/applyOnline',function(req, res) {
    res.render('apply')
})
app.post('/applyOnline',upload.single('profilePicture'),async function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const fatherName=req.body.father;
    const motherName=req.body.mother;
    const email=req.body.email;
    const address=req.body.address;
    const age=req.body.cars;
    const gender=req.body.exist;
    const dob=req.body.birthday;
    const lastinstitution =req.body.lastinstitution;
    const yearsstudied=req.body.yearsstudied;
    const whyyouleft=req.body.whyyouleft;
    const lastdegree=req.body.lastdegree;
    const lastpercentage=req.body.lastpercentage;
    const about=req.body.about;
    console.log(req.body.profilePicture)
    const newApplication=new ApplicationModel({
        fname:fname,
    lname:lname,
    fatherName:fatherName,
    matherName:motherName,
    email:email,
    age:age,
    gender:gender,
    about:about,
    dob:dob,
    address:address,
    lastinstitution:lastinstitution,
    yearsstudied:yearsstudied,
    whyyouleft:whyyouleft,
    lastdegree:lastdegree,
    percentageinlastdegree:lastpercentage,
    profilePicture:req.file.filename

});

 newApplication.save().then(()=>(console.log('file uploaded')))
res.send('Dp Uploaded')
})
app.get('/login',function(req,res){
    res.render('login')
})
app.get('/signUp',function(req,res){
    res.render('signup')
})

app.get('/search/result',async function(req,res){
    res.render('searchresult')})
    var searchResult=null;
app.post('/search/result',async function(req,res){
    const rollno=req.body.rollno
    const StudentName=req.body.name
    searchResult=(await StudentsModel.find({
        rollno:rollno

    }))
    res.redirect('/results')
})
app.get('/results',async function(req,res){
    console.log(searchResult)
    res.render('results',{results:searchResult})
})

app.get('/admin',async function(req,res){
    const applications=await ApplicationModel.find({})
    console.log(applications)
    res.render('admin',{applications:applications})})

app.get('/database',async function(req,res){
    res.render('database',{data:await StudentsModel.find({})})
})
app.get('/admin/application/appId/:id',async function(req,res){
    const id=req.params.id
    const application=await ApplicationModel.find({_id:id})
    res.render('application',{application:application})
})
app.listen(process.env.PORT, () => 
console.log(`Example app listening on port ${process.env.PORT}!`)
)