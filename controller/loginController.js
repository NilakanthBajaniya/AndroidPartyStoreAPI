require('dotenv').config()
const mongoose = require("mongoose");
let Users = mongoose.model("users");
let jwt = require('jsonwebtoken')


const loginUser = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({ "email": email }, (err, user) => {

        if (err) res.status(404).json(err);

        else if (user.password !== password) res.stats(403);

        user['password'] = '';

        const token = jwt.sign({ name: email }, process.env.ACCESS_TOKEN_SECRET)
        const refreshToken = jwt.sign({ name: email }, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'10m'})
        
        const returnJson = { user: user, "x-access-token": token, "x-refresh-token": refreshToken  };
        res.status(200).json(returnJson);
    });
}

module.exports = { 
    loginUser
}