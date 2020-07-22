const userRout = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/user');

userRout.get('/', getUsers);
userRout.post('/', createUser);
userRout.get('/:id', getUser);
module.exports = userRout;
