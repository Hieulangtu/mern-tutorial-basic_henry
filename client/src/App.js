import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard'
import ProtectedRoute from './components/routing/ProtectedRoute'
import About from './views/About'
import PostContextProvider from './contexts/PostContext'

function App() {
	return (
		<AuthContextProvider>
			<PostContextProvider>
				<Router>
					<Switch>
					{/* nhảy ra login  */}
						<Route exact path='/' component={Landing} /> 
						<Route
							exact
							// Thuộc tính exact đảm bảo rằng route chỉ kích hoạt nếu địa chỉ URL khớp chính xác.
							path='/login'
							render={props => <Auth {...props} authRoute='login' />}
						/>
						<Route
							exact
							path='/register'
							//Phương thức render được sử dụng thay vì component để có thể truyền các props vào component.
							render={props => <Auth {...props} authRoute='register' />}
						/>
						<ProtectedRoute exact path='/dashboard' component={Dashboard} />
						<ProtectedRoute exact path='/about' component={About} />
					</Switch>
				</Router>
			</PostContextProvider>
		</AuthContextProvider>
	)
}

export default App
