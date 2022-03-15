const express = require("express")
const UserController = require("../controllers/userController")

const router = express.Router()

const userController = new UserController()



router.delete("/delete-user/:id", userController.deleteUserView)

//router.get("/api/registrar-usuario", userController.addUserView)

router.get("/profile", userController.getUserProfileView)
router.get("/users", userController.getUsersView)

router.post("/update-user", userController.updateUser)

module.exports = router