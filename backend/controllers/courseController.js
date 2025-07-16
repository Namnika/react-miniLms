const Courses = require('../models/Courses')
const striptags = require('striptags');

exports.courseCreate = async (req, res) => {
	try {
		const { title, content } = req.body
		const plainText = striptags(content);

		if (!title || !content) {
			return res.status(400).json({ message: "Title and content are required!" })
		}

		const newCourse = new Courses({ title, content, plainText })
		await newCourse.save()

		res.status(201).json({ message: "Course created successfully!", course: newCourse })
	} catch (error) {
		res.status(500).json({ message: "Server Error: ", error: error.message })
	}
}