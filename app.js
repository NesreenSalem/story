const express=require("express");
const bodyParser=require("body-parser");
const request=require("request")
const https=require("https");
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req, res){
   res.sendFile(__dirname +"/signup.html");
});
app.post("/",function(req,res){
  // res.sendFile(__dirname +"/signup.html");
const firstName=req.body.fName;
 const lastName=req.body.lName;
 const email=req.body.email;

 console.log(firstName,lastName,email);
 const data={
   members: [
    {
      email_address : email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
   ]
 }

const  jsonData=JSON.stringify(data);
const url ="https://us20.api.mailchimp.com/3.0/lists/ecfeccc237";
const options ={
  method: "POST",
  auth : "adam:def3528ba4f73166f1f56a4cfe574ec4-us21",

}
const requeste = https.request(url,options,function(response){
  if(response.statusCode === 200){
     res.sendFile(__dirname +"/success.html");
  }
  else {
     res.sendFile(__dirname +"/failure.html");
  }
     response.on("data",function(data){
       console.log(JSON.parse(data));
     })
});
requeste.write(jsonData);
requeste.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server has started at port 3000");
});

// API Key
// def3528ba4f73166f1f56a4cfe574ec4-us20
// list id
// ecfeccc237
