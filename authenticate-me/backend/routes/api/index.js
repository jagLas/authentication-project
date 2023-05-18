const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const router = require('express').Router();

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

//for testing csrfFetch on frontend
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });

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

module.exports = router;