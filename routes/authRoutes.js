const express = require("express")
const AuthController = require("../controllers/authController")


const router = express.Router()
const authController = new AuthController()

router.get("/login",authController.getLoginView)
router.get("/signup",authController.getSignUpView)
router.post("/signup",authController.signUp)

module.exports = router