const express = require('express')
const router = express.Router()
const {courseCreate} = require('../controllers/courseController')

router.post("/create", courseCreate)

module.exports = router