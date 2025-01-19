import { MoviecardType } from "../../utils/constant"
import MovieCardSkeleton from "../Skeleton/MovieCardSkeleton"
import MovieCard from "./MovieCard"

interface MovieListProps{
    movies: MoviecardType[]
    title?: string
}

function MovieList({movies, title}: MovieListProps) {
  return (
    <div className="md:mt-14 sm:mt-8 mt-2 px-2">
        {
            title && 
            <h1 className="md:text-3xl sm:text-2xl text-xl font-bold text-yellow-500">{title}</h1>
        }
        <div className="row row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
            {
                movies.length > 0 ?
                    movies.length > 0 && movies.map((data, ind) =>(
                        <MovieCard key={ind} movieData={data} />
                    ))
                :
                [...Array(12)].map(item => 
                    <MovieCardSkeleton/>
                )
            }
        </div>
    </div>
  )
}

export default MovieList