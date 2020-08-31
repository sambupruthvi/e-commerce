const { body } = require('express-validator');
const userRepo = require('../../userRepository/users');

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
    }),
    requireEmailExist: body('email').trim().normalizeEmail().isEmail().withMessage('Must provide a valid email').custom(async email => {
        const user = await userRepo.getOneBy({email});
        if (!user) {
            throw new Error('Email not found');
        }
    }),
    requireValidPasswordForUser: body('password').trim().custom(async (password, { req }) => {
        const user = await userRepo.getOneBy({ email : req.body.email });
        if (!user) {
            throw new Error('Invalid Password');
        }
        const validPassword = await userRepo.comparePasswords(user.password, password);
        if (!validPassword) {
            throw new Error('Invalid Password');
        }
    })
}