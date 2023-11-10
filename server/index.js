//dotenv : lấy biến môi trường
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

//cors: frontend và backend nói chuyện
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')


//khai báo hàm kết nối với database
const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.j0fcc.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
			{
				useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
			}
		)

		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)

		//mã kết thúc quá trình
		process.exit(1)
	}
}

//gọi hàm để kết nối
connectDB()

// Dòng này tạo một instance(đối tượng) của Express và lưu trữ nó trong biến app. 
// Bạn sẽ sử dụng app để cấu hình và định nghĩa các route cho ứng dụng.
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
