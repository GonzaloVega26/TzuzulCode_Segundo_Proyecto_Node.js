const express = require("express")
const UserController = require("../controllers/userController")

const router = express.Router()

const userController = new UserController()


router.get("/",userController.getUsersView)
router.delete("/eliminar-usuario/:id", userController.deleteUserView)

//router.get("/api/registrar-usuario", userController.addUserView)


module.exports = router