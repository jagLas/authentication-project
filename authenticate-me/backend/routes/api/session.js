const express = require('express');
const router = express.Router();
const {setTokenCookie, restoreUser} = require('../../utils/auth.js');
const {User} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation.js')

const validateLogin = [
    check('credential')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a valid email or username'),
    check('password')
        .exists({checkFalsy: true})
        .withMessage('Please provide a password'),
    handleValidationErrors
]

//login
router.post('/',
    validateLogin,
    async(req, res, next) => {
    const {credential, password} = req.body
    console.log(req.body)
    const user = await User.login({credential, password});

    if(!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errrors = ['The provided credentials were invalid'];
        return next(err);
    }

    setTokenCookie(res, user);

    return res.json({user});
})


//restore session user
router.get('/', restoreUser,
    (req, res) => {
        const {user} = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            })
        } else return res.json({});
    }
)

//logout
router.delete('/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({message: 'success'});
    }
);

module.exports = router;