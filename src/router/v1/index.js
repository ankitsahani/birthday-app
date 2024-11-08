const { Router } = require('express')
const router = Router()
const { verifyToken } = require('../../middleware/authrencation.js')

router.use('/app-info', require('./health.js'))
router.use('/auth', require('./auth.js'))
router.use(verifyToken)
router.use('/user', require('./user.js'))

module.exports = router
