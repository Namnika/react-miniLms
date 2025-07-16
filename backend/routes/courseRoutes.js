const express = require('express')
const router = express.Router()
const {courseCreate, getAllCourses} = require('../controllers/courseController')

router.post("/create", courseCreate)
router.get('/', getAllCourses);

module.exports = router