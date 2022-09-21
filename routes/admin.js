const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/add-user', adminController.postAddUser);

router.get('/get-users', adminController.getUsers);

router.get('/edit-user/:id', adminController.getEditUser);

router.get('/delete-user/:id', adminController.getDeleteUser);

module.exports = router;