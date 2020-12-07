require('dotenv').config()
const mongoose = require("mongoose");
let Users = mongoose.model("users");
let jwt = require('jsonwebtoken')

const getUsers = function (req, res) {
 
  Users.find().exec(function (err, data) {
    if (err) {

      res.status(404).json(err)
      return;
    }

    res.status(200).json(data)
  });
};

const getUserByEmail = function (req, res) {

  let email = req.params.email;

  Users.findOne({ "email": email }, (err, user) => {

    if (err) {

      res.status(404).json(err);
    }

    user['password'] = '';
    res.status(200).json(user);
  });
}

const createUsers = function (req, res) {

  console.log(req.body.firstName);

  Users.create({

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password
  }, (err, data) => {
    console.log("data : ", data);
    if (err) {

      res.status(400).json(err)
    } else {

      res.status(200).json(data)
    }
  })
};


const getSingleUser = function (req, res) {
  
  if (!req.params.userid) {

    res.status(404).json({ "message": "Not found, userid is required" });
    return;
  }

  Users.findById(req.params.userid).exec((err, data) => {

    if (!data) {

      res.json(404).status({ "message": "user data not found" });
    }
    else if (err) {

      res.status(400).json(err);
      return;
    }
    else {

      res.status(200).json(data)
    }
  });
};

const updateUser = function (req, res) {
  if (!req.params.userid) {

    res.status(404).json({ "message": "Not found, userid is required" });
    return;
  }
  Users.findById(req.params.userid).exec((err, data) => {

    if (!data) {

      res.json(404).status({ "message": "user data not found" });
    } else if (err) {

      res.status(400).json(err);
      return;
    }

    data.firstName = req.body.firstName;
    data.lastName = req.body.lastName;
    data.role = req.body.role;
    data.email = req.body.email;
    data.password = req.body.password;

    data.save((err, data) => {
      if (err) {

        res.status(404).json(err);

      } else {

        res.status(200).json(data)
      }
    });
  });
};


const deleteUser = function (req, res) {
  const userid = req.params.userid;

  if (userid) {
    Users
      .findByIdAndRemove(userid)
      .exec((err, data) => {
        if (err) {
          res
            .status(404)
            .json(err);
          return;
        }
        res
          .status(204)
          .json(null);
      });
  } else {
    res
      .status(404)
      .json({ "message": "No userid" });

  }
};

module.exports = {
  getUsers,
  createUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserByEmail
}