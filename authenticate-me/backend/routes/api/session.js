const express = require('express');
const router = express.Router();
const {setTokenCookie, restoreUser} = require('../../utils/auth.js');
const {User} = require('../../db/models');

router.post('/', async(req, res, next) => {
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

router.delete('/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({message: 'success'});
    }
);

module.exports = router;