const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate:{
      validator: (mail) => validator.isEmail(mail),
      message: 'Введите адрес электронной почты',
    }
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Тут должна быть ссылка',
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
