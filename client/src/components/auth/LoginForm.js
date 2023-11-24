//login forrm : trả về component để login tài khoản
//là một form login

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
	// Context
	const { loginUser } = useContext(AuthContext)

	// Local state
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: ''
	})

	const [alert, setAlert] = useState(null)

	const { username, password } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
                                     //nhớ là trong ngoặc vuông vì nó là chuỗi ký tự

	const login = async event => { //vì ở trong kho AuthContext thì đây là hàm async
		event.preventDefault() //tránh submit form theo HTML gốc, tránh các hành vi mặc định(gửi và tải lại) xảy ra

		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Form className='my-4' onSubmit={login}> 
			{/* khi form đc submit thì nó gọi hàm login */}
				<AlertMessage info={alert} />

				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Login
				</Button>
			</Form>
			<p>
				Don't have an account?
				<Link to='/register'>
					<Button variant='info' size='sm' className='ml-2'>
						Register
					</Button>
				</Link>
			</p>
		</>
	)
}

export default LoginForm
