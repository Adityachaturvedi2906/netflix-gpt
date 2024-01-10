import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
import { Avatar, LOGO } from '../utils/constants';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice"
const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((store) => store.user)				//subscribing to redux store

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
				navigate("/browse")
			} else {
				dispatch(removeUser())
				navigate("/")
			}
		});

		//unsubscribing when the component unmounts
		return () => unsubscribe();
	}, [])

	const handleSignOut = () => {
		signOut(auth).then(() => {
		}).catch((error) => {
			// An error happened.
		});
	}
	return (
		<div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center'>
			<img className='w-44' src={LOGO} alt='logo' />
			{user && <div className='flex'>
				<img className='w-10 h-10' src={Avatar} alt="logo" />
				<button onClick={handleSignOut} className='font-bold text-white px-2'>(Sign Out)</button>
			</div>}
		</div>
	)
}

export default Header