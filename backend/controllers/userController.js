const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
	try {
		const { email, password, role } = req.body;

		if (!email || !password || !role) {
			return res.status(400).json({ message: 'Email, password, and role are required.' });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(409).json({ message: 'User already exists.' });

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ email, password: hashedPassword, role });

		await newUser.save();

		res.status(201).json({ message: 'User created successfully.' });

	} catch (error) {
		res.status(500).json({ message: 'Server error.', error: err.message });
	}
}

exports.login = async (req, res) => {
	try {
		// get user's credentials from clientside
		const { email, password } = req.query;

		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ message: 'Invalid email or password.' });
        
		// generate jwt token
		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		const redirectUrl = user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';

		res.status(200).json({
			message: 'Login successful.',
			token,
			role: user.role,
			redirect: redirectUrl
		});


	} catch (error) {
		res.status(500).json({ message: 'Server error.', error: err.message });
	}
}