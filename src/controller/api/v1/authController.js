const responseMessage = require('../../../constant/responseMessage.js')
const httpResponse = require('../../../utils/httpResponse.js')
const httpError = require('../../../utils/httpError.js')
const quickers = require('../../../utils/quickers.js')
const { validateJoiSchema, validateLoginBody, validateVerifyOtpBody } = require('../../../service/validationService.js')
const databaseService = require('../../../service/databaseService.js')
const configEnv = require('../../../utils/configEnv.js')

module.exports = {
    login: async (req, res, next) => {
        try {
            const { body } = req

            // *Body Validations
            const { error, value } = validateJoiSchema(validateLoginBody, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            // * Destructure validated data
            const { countryCode, phoneNumber } = value

            // * Find user in database or create new user if not exists
            let user = await databaseService.findUserByPhoneNumber(countryCode, phoneNumber)
            const otp = quickers.generateOtp(4)

            if (user) {
                user.otp = otp
                await user.save()
            } else {
                const userdata = {
                    country_code: countryCode,
                    phone_number: phoneNumber,
                    otp
                }
                user = await databaseService.createUser(userdata)
            }

            if (user) {
                return httpResponse(req, res, 200, responseMessage.SUCCESS, { otp })
            }
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },

    verifyOtp: async (req, res, next) => {
        try {
            const { body } = req

            // *Body Validations
            const { error, value } = validateJoiSchema(validateVerifyOtpBody, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            // * Extract validated data
            const { countryCode, phoneNumber, otp } = value

            // * Find user in the database
            const user = await databaseService.findUserByPhoneNumber(countryCode, phoneNumber)

            if (!user) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('user')), req, 404)
            }

            // * Verify OTP
            if (user.otp !== otp) {
                return httpError(next, new Error(responseMessage.INVALID_OTP), req, 401)
            }

            // * Successful verification
            user.is_verified = true
            await user.save()
            // * Generate token
            const accessToken = quickers.generateToken(
                {
                    userId: user.id
                },
                configEnv.ACCESS_TOKEN.SECRET,
                configEnv.ACCESS_TOKEN.EXPIRY
            )
            const userWithoutOtp = user.toJSON()
            delete userWithoutOtp.otp
            // * Replace null values with empty strings
            Object.keys(userWithoutOtp).forEach((key) => {
                if (userWithoutOtp[key] === null) {
                    userWithoutOtp[key] = ''
                }
            })

            const statusCode = userWithoutOtp.name === '' ? 201 : 200
            return httpResponse(req, res, statusCode, responseMessage.SUCCESS, { user: userWithoutOtp, accessToken })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}
