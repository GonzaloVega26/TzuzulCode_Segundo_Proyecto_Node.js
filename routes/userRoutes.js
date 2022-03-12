const express = require("express")
const UserController = require("../controllers/userController")

const router = express.Router()

const userController = new UserController()


router.get("/",userController.getUsersView)
router.delete("/delete-user/:id", userController.deleteUserView)

//router.get("/api/registrar-usuario", userController.addUserView)

router.get("/userProfile", userController.getUserProfileView)


module.exports = router