const express = require('express');
const router = express.Router();
const ctrlUser = require("../controller/userController");
const loginController = require('../controller/loginController')

router.post('/login', loginController.loginUser)

router.get("/",ctrlUser.getUsers);
router.post("/",ctrlUser.createUsers);

router.get("/:userid",ctrlUser.getSingleUser);
router.get("/email/:email", ctrlUser.getUserByEmail)
router.put("/:userid", ctrlUser.updateUser);
router.delete("/:userid",ctrlUser.deleteUser);

module.exports = router;
