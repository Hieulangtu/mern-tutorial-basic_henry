import axios from 'axios'

const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	} else {
		delete axios.defaults.headers.common['Authorization']
		//cần phải xóa vì ví dụ token hết hạn, ko xóa thì nó vẫn lưu token cũ
		//khi xóa thì những cái request về sau ko có access token nữa
	}
}

export default setAuthToken


//Hàm setAuthToken trong đoạn mã JavaScript này được sử dụng để thiết lập hoặc xoá giá trị của 
//header "Authorization" trong các yêu cầu HTTP sử dụng thư viện Axios

// Authorization là một trường (header) được sử dụng để chứa thông tin xác thực (authentication) 
// khi gửi yêu cầu từ client đến server

// axios.defaults.headers.common là một đối tượng trong Axios chứa các header mặc định cho tất cả 
// các yêu cầu.
// Việc thiết lập hoặc xoá header "Authorization" ở mức độ axios.defaults.headers.common có nghĩa 
// là nó sẽ áp dụng cho tất cả các yêu cầu Axios sau đó, mà không cần phải cung cấp lại 
// header "Authorization" trong mỗi yêu cầu riêng lẻ