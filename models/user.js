const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
userSchema.static.findUserByCredentials = function(email, password) {
return this.findOne({email})
.then((user)=>{
  if(!user){
    return Promise.reject(new Error('неправильные почта или пароль'));
  }
  return bcrypt.compare(password, user.password)
.then((matched)=>{
  if(!matched){
    return Promise.reject(new Error('неправильные почта иил пароль'));
  }
  return(user);
})
})
};

module.exports = mongoose.model('user', userSchema);
