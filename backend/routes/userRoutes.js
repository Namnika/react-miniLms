const express = require('express')
const router = express.Router();
const {signup, login} = require('../controllers/userController')

router.post('/users', signup)
router.get('/users', login)

module.exports = router