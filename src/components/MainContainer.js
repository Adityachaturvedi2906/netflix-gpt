import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainContainer = () => {
	const movies = useSelector((store) => store.movies?.nowPlayingMovies);

	if (!movies) return;  //Early Return

	const mainMovie = movies[0];
	const { original_title, overview, id } = mainMovie

	return (
		<div className='overflow-x-hidden'>
			<VideoTitle title={original_title} overview={overview} />
			<VideoBackground movieId={id} />
		</div>
	)
}

export default MainContainer