const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	url: {
		type: String
	},
	status: {
		type: String,
		enum: ['TO LEARN', 'LEARNING', 'LEARNED']
		//1 trong 3 trạng thái
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
		//users : tên bảng nối sang hay tham chiếu đến
	}
})

module.exports = mongoose.model('posts', PostSchema)

//những thứ như title, url, status,.. gọi là field