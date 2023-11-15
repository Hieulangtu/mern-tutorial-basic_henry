const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth') //import middleware

const Post = require('../models/Post')

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
	try {
		//Phương thức populate trong Mongoose giúp lấy dữ liệu từ một bảng (collection) khác 
		//để điền vào TRƯỜNG của document hiện tại dựa trên mối quan hệ giữa chúng
		const posts = await Post.find({ user: req.userId }).populate('user', [
			'username'
		])
		res.json({ success: true, posts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => { //check verifytoken rồi ms đến hàm sau
	const { title, description, url, status } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		const newPost = new Post({
			title,
			description,
			url: url.startsWith('https://') ? url : `https://${url}`,
			status: status || 'TO LEARN',
			user: req.userId
		})

		await newPost.save()

		res.json({ success: true, message: 'Happy learning!', post: newPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		let updatedPost = {
			title, //viết như này trong js có nghĩa là title : title
			description: description || '', //tránh trường hợp giá trị undefined
			url: (url.startsWith('https://') ? url : `https://${url}`) || '',
			status: status || 'TO LEARN'
		}

        //điều kiện update: post tồn tại trong db và người dùng có quyền
		const postUpdateCondition = { _id: req.params.id, user: req.userId }
		                        //req.params.id: '/:id'
								//trường của mongoDB là : _id chứ KHÔNG phải là id
								//đây là object để đối chiếu và db tìm giá trị như thế để kiểm tra

		updatedPost = await Post.findOneAndUpdate(
			//hàm này thực thi tìm post có điều kiện như trong object và update
			postUpdateCondition, //điều kiện
			updatedPost,//giá trị update
			{ new: true } //trả về bản ghi sau khi cập nhật, ko có là trả về cái cũ :))
		)

		// User not authorised to update post or post not found-nếu update fail
		if (!updatedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			post: updatedPost
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router
