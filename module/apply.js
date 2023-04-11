const bodyParser=require('body-parser')
const express=require('express')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.post('/apply',function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const fatherName=req.body.father;
    const motherName=req.body.mother;
    const address=req.body.address;
    const gender=req.body.gender;
    const education=req.body.selectEducation;
    const futureDream=req.body.futureDream;
    const dob=req.body.dob;
    const pincode=req.body.pincode;
    const email=req.body.email;
})
app.get('login',function(req,res){
    res.render('login')
})