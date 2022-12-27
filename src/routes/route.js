const express = require('express');
const router = express.Router();
const { createUsers, getUsers, deleteUsers } = require('../controllers/user');

router.post('/users', createUsers)
      .get('/users', getUsers)
      .delete('/users', deleteUsers);

module.exports = router;