const jwt = require('jsonwebtoken')

//đây là thằng middleware, thằng gác cổng đứng giữa
//nó xử lý và chuyển tiếp dữ liệu giữa các phần khác nhau : xử lý yêu cầu vag phản hồi,
//chuyển tiếp, chuyển đổi dữ liệu, quản lý trạng thái, xử lý lỗi

//trong bài này : chặn request lại, kiểm tra trong headerr có access token không
const verifyToken = (req, res, next) => { //chặn request, next là cho thông qua
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Access token not found' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		//kết quả của decoded (hàm verify) là object được payload nếu dữ liệu HỢP LỆ

		req.userId = decoded.userId
		next() //cho đi qua
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, message: 'Invalid token' })
	}
}

module.exports = verifyToken
