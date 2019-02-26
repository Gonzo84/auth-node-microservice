const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', function(req,res){
    res.status(200).send('all good');
});

router.post('/login', authController.login);

router.post('/register', authController.register);

module.exports = router;
