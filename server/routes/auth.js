const express = require('express')
const router = express.Router()

//argon2 để hash password
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

// ../ folder lên trên một cấp
const verifyToken = require('../middleware/auth')

const User = require('../models/User')

// @route GET api/auth  : miêu tả HTTP method
// @desc Check if user is logged in : miêu tả nội dung
// @access Public : phạm vi truy cập
router.get('/', verifyToken, async (req, res) => {
	//sự khác biệt về dữ liệu được gửi của get với post là dữ liệu của get truyền
	//đi thông qua URL, hiển thị trogn url và sẽ có gới hạn ksich thước 
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
	//Dữ liệu truyền đi thường nằm trong phần thân của yêu cầu và không hiển thị trên URL
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })
		// thực ra viết : const user = await User.findOne({ username: username }) là chuẩn nhưng vì 2 bên giống nhau nên chỉ cần 1

		if (user)
			return res
		        //400 : bad request
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, password: hashedPassword })
		await newUser.save()
		//sau khi save rồi thì những dòng dưới sẽ có thêm thuộc tính _id 

		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id }, //payload : data đc đưa vào
			process.env.ACCESS_TOKEN_SECRET    //khóa môi trường
		)

		res.json({
			//mặc định status 200
			success: true,
			message: 'User created successfully',
			accessToken
		})
		//respond trả về
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// Username found
		//kiểm tra sự chính xác của mật khẩu với argon2
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

//muốn dùng đc phải export nó ra
module.exports = router
