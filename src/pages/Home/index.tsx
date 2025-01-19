import { useEffect, useState } from "react"
import HomeSlider from "../../components/Home/HomeSlider"
import { baseApi } from "../../API/axiosInstance"
import { MoviecardType } from "../../utils/constant"
import MovieList from "../../components/Home/MovieList"
import LoadMoreBtn from "../../components/Buttons/LoadMoreBtn"

function Home() {
  const [movies, setmovies] = useState<MoviecardType[]>([])
  const [page, setPage] = useState<number>(1)

  const fetchMovies = async (page: number) =>{
    try{ 
      const response = await baseApi.get(`/3/movie/top_rated?language=en-US&page=${page}`)
      setmovies(prev => [...prev, ...response.data.results])
    }
    catch (err){
      console.log("Fetch Error in hme page Top rated Movies", err)
    }
  }

  useEffect(()=>{
    fetchMovies(page)
  },[page])

  const handlePageUpdate = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div className="xl:w-[90%] md:w-[95%] mx-auto mb-10">
      <HomeSlider />
      <MovieList movies = {movies} title="Top Rated Movies"/>
      <div onClick={() => handlePageUpdate()}>
        <LoadMoreBtn />
      </div>
    </div>
  )
}

export default Home