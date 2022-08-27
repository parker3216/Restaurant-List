//匯出authenticator函式
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入！')
    res.redirect('/users/login')
  }
}