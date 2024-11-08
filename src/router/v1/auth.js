const { Router } = require('express')
const router = Router()
const authController = require('../../controller/api/v1/authController.js')

router.get('/login', authController.login)
router.post('/verify-otp', authController.verifyOtp)

module.exports = router
