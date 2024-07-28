const joi = require('joi')

const userSchema = joi.object({
    name: joi.string().alphanum().min(3).max(50).required(),
    email: joi.string().email().required(),
    phone: joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    password: joi.string().min(6).max(20).required().custom((value, helper) => {
        if (
            !/[a-z]/.test(value) ||
            !/[A-Z]/.test(value) ||
            !/[0-9]/.test(value) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(value)
        ) {
            return helper.message("password must contain atleast upercase,lowercase,special character and digit")
        }
        return value;
    })
})
const validateData = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next();
}
module.exports = validateData;