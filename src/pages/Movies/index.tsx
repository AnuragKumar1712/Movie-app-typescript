import { useEffect, useState } from "react"
import { category, MoviecardType } from "../../utils/constant"
import { baseApi } from "../../API/axiosInstance"
import MovieList from "../../components/Home/MovieList"
import LoadMoreBtn from "../../components/Buttons/LoadMoreBtn"

interface pageType{
  [key:string]: number
}

function Movies() {
  const [filter, setFilter]= useState(category[0].name)
  const [nowplaying, setNowPlaying] = useState<MoviecardType[]>([])
  const [popular, setPopular] = useState<MoviecardType[]>([])
  const [topRated, setTopRated] = useState<MoviecardType[]>([])
  const [upcoming, setUpcoming] = useState<MoviecardType[]>([])
  const [pages, setpages] = useState<pageType>({"now_playing":1,"popular":1,"top_rated":1,"upcoming":1})

  const toggleSelection = (item:string) => {
    setFilter(item)
  }

  const fetchMovies = async (path: string, page:number) => {
    try{
      console.log(path)
      const response = await baseApi.get(`/3/movie/${path}?language=en-US&page=${page}`)
      console.log(response.data.results)
      switch (path) {
        case "now_playing":
          setNowPlaying(prev=>[...prev, ...response.data.results])
          break;
        case "popular":
          setPopular(prev=>[...prev, ...response.data.results])
          break;
        case "top_rated":
          setTopRated(prev=>[...prev, ...response.data.results])
          break;
        case "upcoming":
          setUpcoming(prev=>[...prev, ...response.data.results])
          break;
        default:
          break;
      }
    }catch(error){
      console.log("Fetch error in Movies Page", error)
    }
  }

  const handleLoadMore = () => {
    const currentCategory = category.find(item => item.name == filter)
    if(currentCategory){
      setpages(prev=>({
        ...prev,[currentCategory.path]: prev[currentCategory.path] + 1
      }))
      fetchMovies(currentCategory.path, pages[currentCategory.path] + 1)
    }
  }

  useEffect(() => {
    const current = category.filter(items => items.name == filter)
    fetchMovies(current[0].path,1)
  }, [filter])

  return (
    <div className="w-[90%] mx-auto mt-4">
      <h1 className="md:text-3xl sm:text-2xl text-xl font-bold text-yellow-500">Explore Movies</h1>
      <div className="flex flex-wrap mt-2">  
        {
          category.map((item, ind) => (
              <div key={ind} className="">
                <button 
                  onClick={()=>toggleSelection(item.name)}
                  className="md:text-base sm:text-sm text-xs font-semibold lg:w-44 md:w-40 sm:w-36 p-2 h-10 hover:bg-[#121212]">{item.name}</button>
                <div className={`h-0.5 bg-blue-400 mx-auto ${filter == item.name? "w-full": "w-0"} duration-200`}></div>
              </div>
          ))
        }
      </div>

      {filter == "Now Playing" &&
        <MovieList movies={nowplaying} />
      }

      {filter == "Popular" &&
        <MovieList movies={popular} />
      }

      {filter == "Top Rated" &&
        <MovieList movies={topRated} />
      }

      {filter == "Upcoming" &&
        <MovieList movies={upcoming} />
      }

      <div onClick={handleLoadMore}>
        <LoadMoreBtn/>
      </div>

    </div>
  )
}

export default Movies