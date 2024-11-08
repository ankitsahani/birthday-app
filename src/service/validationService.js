const Joi = require('joi')

const validateLoginBody = Joi.object({
    countryCode: Joi.string().min(1).max(5).required(),
    phoneNumber: Joi.string().min(4).max(20).required()
})
const validateVerifyOtpBody = Joi.object({
    countryCode: Joi.string().min(1).max(5).required(),
    phoneNumber: Joi.string().min(4).max(20).required(),
    otp: Joi.string().min(4).max(4).required()
})

const validateUserBody = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    dateOfBirth: Joi.date().iso().required()
})

const validateJoiSchema = (schema, value) => {
    const result = schema.validate(value)
    return {
        value: result.value,
        error: result.error
    }
}

module.exports = {
    validateLoginBody,
    validateJoiSchema,
    validateVerifyOtpBody,
    validateUserBody
}
