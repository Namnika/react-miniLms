const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
	try {
		const { email, name, password, role } = req.body;

		if (!email || !name || !password || !role) {
			return res.status(400).json({ message: 'Email, password, and role are required.' });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) return res.status(409).json({ message: 'User already exists.' });

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ email, name, password: hashedPassword, role });

		await newUser.save();

		res.status(201).json({ message: 'User created successfully.' });

	} catch (err) {
		res.status(500).json({ message: 'Server error.', error: err.message });
	}
}

exports.login = async (req, res) => {
	try {
		// get user's credentials from clientside
		const { email, password, isAdminLogin } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ message: 'Invalid email or password.' });

		// If "Login as Admin" is checked, but user is not admin/owner, deny access
		if (isAdminLogin && user.role !== 'admin' && user.role !== 'owner') {
			return res.status(403).json({ message: 'Access denied. Not an admin or owner.' });
		}

		// generate jwt token
		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		console.log('Generated JWT token:', token);

		// const redirectUrl = user.role === 'admin' && user.role === 'owner'? '/admin/dashboard' : '/student/dashboard';

		// redirecting user as per the role ['student', 'owner', 'admin']
		let redirectUrl = '/student/dashboard';

		if (user.role === 'admin') {
			redirectUrl = '/admin/dashboard'
		} else if (user.role === 'owner') {
			redirectUrl = '/'
		}

		res.status(200).json({
			message: 'Login successful.',
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			redirect: redirectUrl
		});


	} catch (err) {
		res.status(500).json({ message: 'Server error.', error: err.message });
	}
}