const сard = require('../models/card');

module.exports.getCards = (req, res) => {
  сard
    .find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(404).send({ data: err.message }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  сard
    .create({ name, link, owner: req.user._id })
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ data: err.message }));
};
module.exports.deleteCard = (req, res) => {
  сard
    .findOneAndDelete({ _id: req.params.cardId }).orFail()
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => res.status(404).send({ err, message: 'нет такой карточки' }));
};
