const express = require('express')
const router = express.Router();
const {signup, login} = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/users', signup)
router.post('/login/users', login)

// authentication token for student dashboard
router.get('/student/dashboard', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});
router.get('/admin/dashboard', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});


module.exports = router