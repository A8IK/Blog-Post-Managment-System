import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
	e.preventDefault();
	const email = e.target.email.value;
	const password = e.target.password.value;
	const user = {email, password}
	console.log(user);
    try{
		const response = await fetch("http://localhost:9000/api/auth/login", {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {'Content-Type': 'application/json'},
		})

		// .then(res => res.json())
		// .then(data => {
		// 	localStorage.setItem('token', data.token);
		// });

		const data = await response.json();
    	console.log('Login response data:', data);

    if (response.ok) {
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('User stored in localStorage:', data.user);
      } 
	  else {
        console.warn('User object is missing in the backend response.');
      }
		navigate("/posts");	
		window.dispatchEvent(new Event('storage'));
	}
}
	catch(error){
		console.log(error);
	}
  }

return (

<div className="min-h-screen flex items-center justify-center w-full ">
	<div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
		<form onSubmit={handleSubmit}>
			<div className="mb-4">
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
				<input type="email" id="email" name="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required/>
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
				<input type="password" id="password" name="password"  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required/>
				<a href="../components/SignUp.js"
					className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
					Password?</a>
			</div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					<input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" />
					<label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
				</div>
				<Link to="/signup" className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  				Sign Up</Link>
			</div>
			<button type="submit" className="bg-blue-500 text-white w-full py-2">Login</button>
		</form>
	</div>
</div>

  );
};

export default Login;
