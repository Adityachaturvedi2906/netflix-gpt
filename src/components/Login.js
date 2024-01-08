import React, { useRef, useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { addUser } from "../utils/userSlice"

import { useDispatch } from 'react-redux';

const Login = () => {

	const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const name = useRef(null);
	const email = useRef(null);
	const password = useRef(null);

	const handleButtonClick = () => {
		let message;
		if (!isSignInForm) {
			message = checkValidData(email.current.value, password.current.value);
			setErrorMessage(message);
		} else {
			message = checkValidData(email.current.value, password.current.value);
			setErrorMessage(message);
		}

		if (message) return;

		if (!isSignInForm) {
			createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
				.then((userCredential) => {
					const user = userCredential.user;
					updateProfile(user, {
						displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
					}).then(() => {
						//updating the Redux store
						const { uid, email, displayName, photoURL } = auth.currentUser;
						dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
						navigate("/browse")
						console.log(user);
					}).catch((error) => {
						setErrorMessage(error.message)
					});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorCode + "-" + errorMessage);
				});
		} else {
			signInWithEmailAndPassword(auth, email.current.value, password.current.value)
				.then((userCredential) => {
					const user = userCredential.user;
					navigate("/browse")
					console.log(user);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage("User Not Found!")
					console.log(errorCode + " - " + errorMessage);
				});
		}

	}

	const toggleSignInForm = () => {
		setErrorMessage("");
		setIsSignInForm(!isSignInForm);
	}

	return (
		<div>
			<Header />
			<div className='absolute'>
				<img className='' src='https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='bg-img' />
			</div>
			<form onSubmit={(e) => e.preventDefault()} className='w-3/12 mx-auto absolute my-36 right-0 left-0 p-12 bg-black text-white rounded-md bg-opacity-80'>
				<h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
				{!isSignInForm &&
					<input ref={name} type="text" placeholder='Full Name' className='p-3 my-3 w-full bg-[#333] rounded-sm' />
				}
				<input ref={email} type="email" placeholder='Email Address' className='p-3 my-3 w-full bg-[#333] rounded-sm' />
				<input ref={password} type="password" placeholder='Password' className='p-3 my-3 w-full bg-[#333] rounded-sm' />
				{errorMessage && <p className='text-red-500 font-semibold text-lg py-3'>{errorMessage}</p>}
				<button className='p-3 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
				{isSignInForm ? <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>New to Netflix? Sign Up Now</p> : <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>Already registered? Sign In Now</p>}
				{/* <p className='py-4' onClick={toggleSignInForm}>New to Netflix? Sign Up Now</p> */}
			</form>
		</div>
	)
}

export default Login