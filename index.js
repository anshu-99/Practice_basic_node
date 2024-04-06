const http = require('http')
const express = require('express')
const path = require('path')
const db = require('./config/mongoose')
const registerUser = require('./model/registerData')
const port = 8002
const app = express()

app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))

app.use(express.urlencoded())
app.use(express.static('assets'))

// 
app.get('/', async function(req, res) {
    try {
        const data = await registerUser.find({});
        return res.render('register', {
            title: "Register",
            data_list: data
        });
    } catch (err) {
        console.log("Error:", err);
        // Handle the error appropriately, maybe render an error page
        res.status(500).send("Internal Server Error");
    }
});

// home
app.get('/home', function(req, res) {
    res.render('home', { title: "Home" }); 
});

// register user
app.post('/register', async function(req, res) {
    try {
        // Check if a user with the provided email already exists
        const existingUser = await registerUser.findOne({ email: req.body.email });
        if (existingUser) {
            // If a user with the email already exists, redirect to the login page
            return res.redirect('back');
        } else {
            // If no user with the email exists, proceed with creating the new user
            const newUser = await registerUser.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            });
            console.log("New user created:", newUser);
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error in creating user:", err);
        // Handle the error appropriately, maybe render an error page
        res.status(500).send("Internal Server Error");
    }
});


// running
app.listen(port,function(err){
    if(err){
        console.log('error in running the server')
        return err
    }
    console.log("Server is running on ",port)
})