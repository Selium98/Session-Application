const express = require('express')
const session = require('express-session')
var port = process.env.PORT || 6700
var bodyParser = require('body-parser')

var app = express() //main server
var admin = express() //sub server
var member = express() //sub erver

app.set('view engine' , 'ejs')

app.use(bodyParser.urlencoded({
    extended:true
    }
))
//mountinng sesssion
admin.use(session({
    secret: "admin123",
    resave: true,
    saveUninitialized: true
}))

member.use(session({
    secret: "member123",
    resave: true,
    saveUninitialized: true
}))

admin.get("/", function(req, res){
    res.render("adminlog")
})

admin.post("/adpost" , function(req,res){
    var name2 = req.body.name1
    var pass2 = req.body.password1
    if( req.session.name ) //checking for session variable name
    {
        res.send("<body style='background-color:grey;color:white'><h1 style='margintop:300px'><center>Session Logged in. UserName : "+name2+"</center></h1></body>")
        console.log("loggied in")
    }
    else
    {
        res.send("<body style='background-color:grey;color:white'><h1 style='margintop:300px'><center>No Admin Session Available</center></h1></body>")
       
        console.log("No admin session available")
    }
})

member.get("/", function(req, res){
    res.render("memberlog")
})

member.post("/mempost" , function(req,res){
    
    if( req.session.name ) //checking for session variable name
    {
        var name2 = req.body.name1
        var pass2 = req.body.pasword1
        res.send("<body style='background-color:grey;color:white'><h1 style='margintop:300px'><center>Session Logged in. UserName : "+name2+"</center></h1></body>")
        console.log("loggied in as user")
    }
    else
    {
       res.send("<body style='background-color:grey;color:white'><h1 style='margintop:300px'><center>No User Session Available</center></h1></body>")
       
        console.log("No user session available")
    }
})

member.get("/login", function(req, res){
    req.session.name = "Yash"
    console.log("member session started")
    res.send("member session started")
})

app.use("/admin", admin)
app.use('/member', member)

app.listen(port, function(err,res){
    if (err){
        console.log("Err in starting")
    }
    console.log("Server started at : ",port)
})