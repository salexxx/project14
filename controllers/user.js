const user = require('../models/user');
const bcrypt = require('bcryptjs'); 

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
