//載入passport
const passport = require('passport') 
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user') //載入User model
const bcrypt = require('bcryptjs') //引入bcrypt
const FacebookStrategy = require('passport-facebook').Strategy


module.exports = app => {
  //初始化Passport model
  app.use(passport.initialize())
  app.use(passport.session())
  
  //本地登入設定
  passport.use(new LocalStrategy({ usernameField: 'email' },(email, password, done) => {
    User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false,{ message: 'That email is not registered!' })
      }
      return bcrypt.compare(password, user.password)
      .then(isMatch => {if (!isMatch){
        return done(null, false, { message: 'Email or Password incorrect.' })
      }
        return done(null, user)
      })
    })
        .catch(err => done(err, false))
    }))

    //facebook登入設定
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID, 
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName' ] },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
      }))

  //序列化與反序列化設定
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
    .lean()
    .then(user => done(null, user))
    .catch(err => done(err, null))
  })
  }
