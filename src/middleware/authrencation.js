const responseMessage = require('../constant/responseMessage')
const User = require('../models/user.js')
const configEnv = require('../utils/configEnv')
const httpError = require('../utils/httpError')
const quickers = require('../utils/quickers')
const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {
    try {
        let token = req.headers['authorization']
        token = token?.split(' ')[1]

        if (!token) return httpError(next, new Error(responseMessage.INVALID_TOKEN_OR_CODE), req, 498)

        const payload = quickers.verifyToken(token, configEnv.ACCESS_TOKEN.SECRET)
        
        if (!payload?.userId) return httpError(next, new Error(responseMessage.INVALID_TOKEN_OR_CODE), req, 498)

        let user = await User.findByPk(payload?.userId)

        if (!user) return httpError(next, new Error(responseMessage.NOT_FOUND('User')), req, 422)

        req.user = user
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) return httpError(next, new Error(responseMessage.TOKEN_EXPIRED), req, 499)
        if (error instanceof jwt.JsonWebTokenError) return httpError(next, new Error(responseMessage.INVALID_TOKEN_OR_CODE), req, 500)
        next(error)
    }
}
