const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.getUser = (req, res) => {
  user
    .findById(req.params.id).orFail()
    .then((someuser) => res.send({ data: someuser }))
    .catch((err) => res.status(404).send({ err, message: 'Пользователь не найден' }));
};
