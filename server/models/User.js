const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

//users : sẽ là tên của bảng/collection. 
//Đối tượng tham chiếu bảng là UserSchema vừa khai báo (UserSchema là scheme truyền vào)
module.exports = mongoose.model('users', UserSchema)
