import React,{useEffect, useState} from 'react'
import { baseApi } from '../../API/axiosInstance'
import { MoviecardType } from '../../utils/constant'
import MovieList from '../Home/MovieList'
import LoadMoreBtn from '../Buttons/LoadMoreBtn'

function SimilarMovies({ movieId }: {movieId: string}) {
    const [movies, setMovies]= useState<MoviecardType[]>([])
    const [page, setPage]= useState(0)

    const fetchSimilarMovies = async(page: number) => {
            try{
                const response = await baseApi.get(`/3/movie/${movieId}/similar?language=en-US&page=${page}`)
                setMovies(prev=>[...prev,...response.data.results])
            }catch(error){
                console.log("Similar Movies Error", error)
            }
    }

    const handleLoadMore = () => {
        fetchSimilarMovies(page + 1)
        setPage(prev => prev + 1)
    }

    useEffect(() => {
        fetchSimilarMovies(1)
        setPage(prev => prev + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId])
    

    return (
        <div>
            <MovieList movies={movies} title='Similar Movies'/>
            <div onClick={handleLoadMore}>
                <LoadMoreBtn/>
            </div>
        </div>
    )
}

export default SimilarMovies