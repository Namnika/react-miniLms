const Courses = require('../models/Courses')

exports.courseCreate = async (req, res) => {
	try {
		const { title, content } = req.body

		if (!title || !content) {
			return res.status(400).json({ message: "Title and content are required!" })
		}

		const newCourse = new Courses({ title, content })
		await newCourse.save()

		res.status(201).json({ message: "Course created successfully!" })
	} catch (error) {
		res.status(500).json({ message: "Server Error: ", error: error.message })
	}
}