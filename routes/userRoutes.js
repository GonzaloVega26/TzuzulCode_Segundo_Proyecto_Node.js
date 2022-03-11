const express = require("express")
const UserController = require("../controllers/userController")

const router = express.Router()

const userController = new UserController()


router.get("/users",userController.getUsersView)

router.get("/userProfile", userController.getUserProfileView)


module.exports = router