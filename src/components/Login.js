import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

	const [isSignInForm, setIsSignInForm] = useState(true)

	const toggleSignInForm = () => {
		setIsSignInForm(!isSignInForm)
	}

	return (
		<div>
			<Header />
			<div className='absolute'>
				<img className='' src='https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='bg-img' />
			</div>
			<form className='w-3/12 mx-auto absolute my-36 right-0 left-0 p-12 bg-black text-white rounded-md bg-opacity-80'>
				<h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
				{!isSignInForm &&
					<input type="text" placeholder='Full Name' className='p-3 my-3 w-full bg-[#333] rounded-sm' />}
				<input type="text" placeholder='Email Address' className='p-3 my-3 w-full bg-[#333] rounded-sm' />
				<input type="password" placeholder='Password' className='p-3 my-3 w-full bg-[#333] rounded-sm' />
				<button className='p-3 my-4 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
				{isSignInForm ? <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>New to Netflix? Sign Up Now</p> : <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>Already registered? Sign In Now</p>}
				{/* <p className='py-4' onClick={toggleSignInForm}>New to Netflix? Sign Up Now</p> */}
			</form>
		</div>
	)
}

export default Login