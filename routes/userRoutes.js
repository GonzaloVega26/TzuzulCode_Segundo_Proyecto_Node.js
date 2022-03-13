const express = require("express")
const UserController = require("../controllers/userController")

const router = express.Router()

const userController = new UserController()


router.get("/",userController.getHomeView)
router.delete("/delete-user/:id", userController.deleteUserView)

//router.get("/api/registrar-usuario", userController.addUserView)

router.get("/profile", userController.getUserProfileView)
router.get("/users", userController.getUsersView)


module.exports = router