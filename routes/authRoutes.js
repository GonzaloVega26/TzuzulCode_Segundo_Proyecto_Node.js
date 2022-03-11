const express = require("express")
const AuthController = require("../controllers/authController")


const router = express.Router()
const authController = new AuthController()
//Home View
router.get("/", authController.getHomeView)
  
/*---------Session Info---------*/
router.get("/login",authController.getLoginView)
router.post("/login",authController.login)

/*---------Session Info---------*/
router.get("/logout",authController.logOut)

/*---------Session Info---------*/
router.get("/registration",authController.getRegistrationView)
router.post("/registration",authController.signUp)


module.exports = router