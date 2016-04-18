const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const secrets = require('../../../../secrets.json')

export default function attachPassport (router) {
  let db = router.database.models

  function mapProfileToUser (profile, accessToken) {
    return (
      { githubId: profile.id
      , token: accessToken
      , email: profile.email
      , name: profile.username
      })
  }

  passport.serializeUser((user, done) => {
    done(null, user.githubId)
  })

  passport.deserializeUser((id, done) => {
    db.user.findOne()
      .where({ githubId: id })
      .then((user) => {
        done(null, user)
      })
      .catch((err) => {
        done(err)
      })
  })

  function handleError (cb, err) { cb(err) }

  function createNewUserFromInvitation (invitation, profile, accessToken, cb) {
    let newUser = mapProfileToUser(profile, accessToken)
    db.user.create(newUser)
      .then((user) => {
        db.invitation.destroy(invitation.id)
          .then(() => { cb(null, user) })
          .catch(handleError.bind(null, cb))
      })
      .catch(handleError.bind(null, cb))
  }

  passport.use(new GitHubStrategy(
    { clientID: secrets.GitHub.clientId
    , clientSecret: secrets.GitHub.clientSecret
    , callbackURL: secrets.GitHub.callbackUrl
    }
  , function (accessToken, refreshToken, profile, cb) {
      db.user.findOne({ githubId: profile.id })
        .then((user) => {
          if (user) {
            cb(null, user)
          } else {
            db.invitation.findOne({ service: 'GitHub', username: profile.username })
              .then((invitation) => {
                if (invitation) {
                  createNewUserFromInvitation(invitation, profile, accessToken, cb)
                } else {
                  handleError(cb, new Error('No invitation exists for user'))
                }
              })
              .catch(handleError.bind(null, cb))
          }
        })
        .catch(handleError.bind(null, cb))
    }
  ))

  router.get('/auth/github'
    , passport.authenticate('github'
    , { scope: ['profile', 'user:email', 'repo'] }))

  router.get('/auth/github/callback',
    passport.authenticate('github'
    , { successRedirect: '/admin/account'
      , failureRedirect: '/admin/login'
      }))
}
