const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
dotenv.config();
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
mongoose
  .connect(process.env.MONGODB_SECRET_KEY)
  .then(() => console.log('connected sucessfully'))
  .catch((err) => console.log(err));
app.listen(5000, () => {
  console.log('app is running');
});
