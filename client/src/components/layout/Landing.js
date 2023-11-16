import { Redirect } from 'react-router-dom'

const Landing = () => {
	return <Redirect to='/login' />
}

export default Landing

//
// Trong đoạn mã trên, import { Redirect } from 'react-router-dom' được sử dụng để 
//nhập thành phần Redirect từ thư viện react-router-dom. Redirect là một thành phần của 
//React Router được sử dụng để chuyển hướng người dùng từ một địa chỉ URL cũng như thực 
//hiện hành động chuyển hướng.

// Trong component Landing, nó trả về một thành phần Redirect với thuộc tính to='/login'. 
//Điều này có nghĩa là khi component Landing được kích hoạt, người dùng sẽ tự động được 
//chuyển hướng đến địa chỉ URL '/login'.

// Tính năng này thường được sử dụng trong các trường hợp như khi người dùng truy cập một
// trang không cần đăng nhập, nhưng ứng dụng yêu cầu họ đăng nhập để tiếp tục. Trong trường 
//hợp này, Redirect giúp chuyển hướng người dùng đến trang đăng nhập một cách tự động.