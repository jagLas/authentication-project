const router = require('express').Router();
const {setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth.js');
const {User} = require('../../db/models');
// const {restoreUser} = require('../../utils/auth.js')

/*
//routest for testing middleware auth functions
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'demo-user'
    }
  })

  setTokenCookie(res, user);
  return res.json({user})
})

router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user)
})

router.get('/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
)
*/

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;