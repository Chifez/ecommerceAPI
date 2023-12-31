const User = require('../models/Users');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

//REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json('saved successfully', savedUser);
  } catch (error) {
    res.status(500).json('an error occured');
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const hashedPassword = CryptoJS.AES.decrypt(
      req.body.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (!user || !hashedPassword === user.password) {
      res.status(401).json('wrong credentials');
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3d' }
    );
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, accessToken });
  } catch (error) {
    res.status(500).json('an error occured');
  }
});
module.exports = router;
