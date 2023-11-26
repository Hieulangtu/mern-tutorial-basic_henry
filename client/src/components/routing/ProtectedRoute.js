import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from '../layout/NavbarMenu'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	//component: Component là đổi tên. nó đc tính là 1 tham số khi đc gọi ở app.js, ví dụ Dashboard
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated ? (
					<>
						<NavbarMenu />
						<Component {...rest} {...props} />
						{/* ...rest là các prop của Route
						...props là các prop của render 
						<Component/> : là tên của biến component mà ta muốn render
						*/}
					</>
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	)
}

export default ProtectedRoute

//component có cấu trục bọc component khác. higher order component
//Bảo vệ các route

// { component: Component, ...rest } là một cú pháp JavaScript được sử dụng để giữ và truyền các thuộc 
// tính không được sử dụng trực tiếp trong ProtectedRoute tới thành phần Route của thư viện React 
// Router. Giải thích từng phần:

// { component: Component }:
// component: Component là một cú pháp ES6 để ánh xạ thuộc tính component của đối tượng vào một biến 
// mới được đặt tên là Component.
// Trong React Router, Route có một thuộc tính component để chỉ định thành phần React mà nó sẽ hiển 
// thị khi đường dẫn khớp.
// Bằng cách này, bạn có thể sử dụng Component trong nội dung render của Route mà không cần phải viết 
// component={Component}.

// ...rest:
// ...rest sử dụng Rest Parameter và thu thập tất cả các thuộc tính còn lại của rest thành một đối 
// tượng mới.
// Trong trường hợp này, nếu có bất kỳ thuộc tính nào khác mà bạn truyền vào ProtectedRoute (ngoại 
// trừ component), chúng sẽ được thu thập vào đối tượng rest.
// Điều này giúp giữ cho mã linh hoạt và giảm việc bạn phải khai báo từng thuộc tính một cách cụ thể.

//<Component {...rest} {...props} /> : ở đoạn này , ...rest sẽ là các tham số Route như exact, path
//                                                  ...props là các prop của component ta truyền vào  