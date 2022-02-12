const express = require('express')
const userRoutes = require('../controllers/userController')

const authPolicyController = require("../middleware/policies/AuthenticationControllerPolicy")
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/user/register', authPolicyController.register , userRoutes.register)
router.post('/user/login', authPolicyController.login, userRoutes.login)
router.get("/user/checkToken", auth, userRoutes.checkToken)

module.exports = router