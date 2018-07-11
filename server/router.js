const Auth = require('./controllers/auth');
const Question = require('./controllers/questions');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false })

module.exports = (app) => {
  // app.get('/', requireAuth, (req, res) => {
  //   res.send({ test: 'test' })
  // })
  app.get('/questions', (req, res) => {
    res.send([{
      title: 'abc',
      type: 'boolean'
    }])
  });
  app.post('/addQuestion', requireAuth, Question.addQuestion);
  app.post('/signin', requireSignin, Auth.signin);
  app.post('/signup', Auth.signup);
}