const { User } = require('../models');

module.exports = {
  async registerUser(req, res) {
    try {
      const user = await User.create(req.body);
      req.session.user_id = user.id;
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
      res.redirect('/register');
    }
  },

  async loginUser(req, res) {
    const formData = req.body;
    const user = await User.findOne({
      where: {
        username: formData.username
      }
    });

    //Redirect if not a user
    if (!user) {
      return res.redirect('/register');
    }

    req.session.user_id = user.id;
    res.redirect('/dashboard');
  },

  logoutUser(req, res) {
    //Terminates session and redirects
    req.session.destroy();
    res.redirect('/');
  }
}