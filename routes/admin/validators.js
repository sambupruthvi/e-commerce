const { check } = require('express-validator');
const userRepo = require('../../userRepository');

module.exports = {
    requireEmail: body('email').trim().normalizeEmail().isEmail().withMessage('Must be a valid email').custom(async email => {
        const emailCheck = await userRepo.getOneBy({email});
        if (emailCheck) {
            throw new Error('Email already in use');
        }
    }),
    requirePassword: body('password').trim().isLength({min: 8, max : 20}).withMessage('Must be between 8 and 20 characters'),
    requirePasswordConfirmation: body('confirmation').trim().isLength({min: 8, max : 20}).withMessage('Must be between 8 and 20 characters').custom((confirmation, { req }) => {
        if (req.body.password !== confirmation) {
            throw new Error('Password did not match');
        }
    })
}