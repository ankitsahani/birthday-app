const responseMessage = require('../../../constant/responseMessage.js')
const httpResponse = require('../../../utils/httpResponse.js')
const httpError = require('../../../utils/httpError.js')
const quickers = require('../../../utils/quickers.js')
const { validateUserBody, validateJoiSchema } = require('../../../service/validationService.js')
const databaseService = require('../../../service/databaseService.js')

module.exports = {
    updateProfile: async (req, res, next) => {
        try {
            const { body } = req

            // *Body Validations
            const { error, value } = validateJoiSchema(validateUserBody, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            // * Extract validated data
            const { name, dateOfBirth: date_of_birth } = value

            // * Update user profile in database
            const updatedUser = await databaseService.updateUserProfile(req.user.id, { name, date_of_birth })

            // * Send response with updated user data
            return httpResponse(req, res, 200, responseMessage.SUCCESS, {})
        } catch (err) {
            return httpError(next, err, req, 500)
        }
    }
}
