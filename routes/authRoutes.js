const express = require("express")
const AuthController = require("../controllers/authController")


const router = express.Router()
const authController = new AuthController()

router.get("/login",authController.getLoginView)
router.get("/registration",authController.getRegistrationView)
router.post("/registration",authController.signUp)

module.exports = router