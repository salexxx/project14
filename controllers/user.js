const user = require('../models/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash =>  user.create({
    email: req.body.email,
    password: hash,
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  }))
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  user
    .findById(req.params.id).orFail()
    .then((someuser) => res.send({ data: someuser }))
    .catch((err) => res.status(404).send({ err, message: 'Пользователь не найден' }));
};

module.exports.login = (req, res) => {
  const {email, password} = req.body;
  return user.findUserByCredentials(email, password)
  .then((user) => {
   const token = jwt.sign({_id: user._id},{expiresIn: '7d'});
   res.send({token});
  })
  .catch((err) => {
    res
    .status(401)
    .send({message: err.message});

  })
}
