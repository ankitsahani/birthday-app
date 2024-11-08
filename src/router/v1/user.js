const { Router } = require('express')
const userController = require('../../controller/api/v1/userController')
const router = Router()

router.get('/update', userController.updateProfile)

module.exports = router
