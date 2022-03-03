const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

let ctr=1;
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shashaank1453@gmail.com',
      pass: 'Chanti@99'
    }
  });  


app.get("/",(req,res)=>{
    console.log("form page loaded at a client");
    res.sendFile(__dirname+"/form.html");
});

app.post("/",(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;

    let mailOptions = {
      from: 'shashaank1453@gmail.com',
      to: 'shashankdesai99@gmail.com',
      subject: `Form  Response ${ctr}`,
      text: `   Name: ${name} 
    email: ${email} 
    tel: ${phone}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.sendFile(__dirname+"/submitted.html");
    ctr++;
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});