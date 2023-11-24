import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'


//export nhà kho
export const AuthContext = createContext()


//biến children bên trong do component này nó đi bọc chương trình
const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null
	})

	// Authenticate user
	const loadUser = async () => {
		//set token nếu có sẵn
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}
    // try catch bắt lỗi đề phòng các error hoặc token bậy đểu
		try {
			const response = await axios.get(`${apiUrl}/auth`)
			if (response.data.success) {
				dispatch({
					type: 'SET_AUTH',
					payload: { isAuthenticated: true, user: response.data.user }
				})
			}
		} catch (error) { //lỗi nào đó xảy ra, lỗi hệ thống hoặc token hết hạn ...
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)  //gọi lại để xóa header, nếu ko nó lưu cái sai cũ(nếu có)
			dispatch({
				type: 'SET_AUTH',
				payload: { isAuthenticated: false, user: null }
			})
		}
	}

	useEffect(() => loadUser(), [])//làm luôn một lần khi app bắt đầu (do render sớm hì)

	// Login
	//async vì nói chuyện vs database -> dùng try..catch
	//ngoài ra vì axios trả về promise nên dùng await async
	const loginUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm)//nếu ko có userForm ở đây thì coi như ko gửi gì :))
			//cái .post(tên đường dẫn) này là trùng với khai báo bên backend/server
			if (response.data.success)
			    //đưa token vào localStorage
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				)

			await loadUser()

			return response.data
	// Trong Axios, khi một yêu cầu HTTP không thành công (ví dụ: lỗi 400, 404, 500), 
	// thì error sẽ là một đối tượng chứa thông tin về lỗi. Đối tượng này thường có một 
	// thuộc tính là response, và response cũng là một đối tượng chứa thông tin về phản hồi 
	// từ máy chủ. nó liên quan đến STATUS từ server
		} catch (error) {//error là 1 object
			if (error.response.data) return error.response.data 
			//lỗi có chủ đích, lỗi mà error vẫn nhận response.data, có message trong đó
			//ví dụ như nhập sai mật khẩu các thứ
			else return { success: false, message: error.message }
		}
	}

	// Register
	const registerUser = async userForm => {
		try {
			const response = await axios.post(`${apiUrl}/auth/register`, userForm)
			if (response.data.success)
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				)

			await loadUser()

			return response.data
		} catch (error) {
			if (error.response.data) return error.response.data
			else return { success: false, message: error.message }
		}
	}

	// Logout
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}

	// Context data
	//data trong nhà kho :))) data chúng ta cần
	const authContextData = { loginUser, registerUser, logoutUser, authState }

	// Return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

//export component . Sau này nó sẽ bọ các component khác ở trong app.js
//các components được nó bọc sẽ có quyền dùng nhà kho này :))
export default AuthContextProvider


// AuthContextProvider là một React component được sử dụng để bọc các thành phần của ứng dụng 
// với một context provider để chia sẻ thông tin xác thực.
// AuthContext.Provider là provider thực tế, cung cấp giá trị context và dispatch (nếu sử 
// dụng useReducer) cho các thành phần con của nó.