module.exports = {
    SUCCESS: `The operation has been successfully`,
    SOMETHING_WENT_WRONG: `Something went wrong`,
    NOT_FOUND: (entity) => `${entity} not found`,
    TO_MANY_REQUESTS: `Too many requests! Please try again after sometime`,
    INVALID_PHONE_NUMBER: `Invalid phone number`,
    ALREADY_EXIST: (entity, identifier) => `${entity} already exists ${identifier}`,
    INVALID_TOKEN_OR_CODE: `Invalid token`,
    ACCOUNT_ALREADY_CONFIRMED: `Account already confirmed`,
    INVALID_EMAIL_PASSWORD: `Invalid email password`,
    UNAUTHORIZED: `You are not authorized to perform this action`,
    ACCOUNT_NOT_CONFIRMED: `Account not confirmed`,
    INVALID_REQUEST: `Invalid request`,
    EXPIRED_URL: `Your password reset url has expired`,
    INVALID_OLD_PASSWORD: `Invalid old password`,
    PASSWORD_MACHED_WITH_OLD_PASSWORD: `Password does not match with old password`,
    INVALID_OTP: `Invalid OTP`,
    OTP_ALREADY_USED: `OTP already used`,
    TOKEN_EXPIRED: `Your login session has been expired. Please login again.`
}