const express = require('express');
const { default: mongoose } = require('mongoose');
const UserModel = require('./model');

const app = express()
const PORT = process.env.PORT || 5000


////Connect DB
const baseUri = `mongodb+srv://ALI:ali.devs123@cluster0.bhhln.mongodb.net/users?retryWrites=true&w=majority`;
mongoose.connect(baseUri);
mongoose.connection.on("connected", () => console.log("mongoDB is connected"));
mongoose.connection.on("error", (err) => console.log("error", err));


//Allowing Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//// Signup API

app.post("/api/signup", (req,res) => {
    const body = req.body
    const userObj = {
        first_name: body.first_name,
        last_name: body.last_name,
        gender: body.gender,
        role: body.role,
        email: body.email,
        password: body.password,
    }

    UserModel.create(userObj, (err, data) => {
        if(err){
            res.send(err)
        }else{
            res.send("user Successfully Signup")
        }
    })
})


// Login API

app.post('/api/login', (req,res) => {
    const body = req.body
    const userObj = {
        email: body.email,
        password: body.password,
    }
    UserModel.findOne(userObj, (err,data) => {
        if(err){
            res.send(err)
        } else if(data){
            res.send(data)
        }else{
            res.send("invalid email or password")
        }
    })
})



//Single User

app.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
  
    UserModel.findOne({ _id: id }, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  });



//All User
app.get("/api/user", (req, res) => {
  
    UserModel.find({}, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  });




app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})