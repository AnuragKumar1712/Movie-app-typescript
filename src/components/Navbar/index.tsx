import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react"
import { Link } from "react-router-dom"
import { baseApi } from "../../API/axiosInstance"
import { CarouselMovieType } from "../../utils/constant"
import CarouselMiniCard from "../Home/CarouselMiniCard"
import { IoClose } from "react-icons/io5";


function Navbar() {
    const [search, setSearch] = useState("")
    const [searchedList, setSearchedList] = useState<CarouselMovieType[]>([])
    const [showSearch, setShowSearch] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }

    const handleKeyPress = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key=="Enter"){
            (event?.target as HTMLInputElement).blur()
        }
    }

    const toggleShow = (bool: boolean) => {
        setShowSearch(bool)
    }

    const fetchSearch = async() => {
        try {
            const response = await baseApi.get(`/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`)
            setSearchedList(response.data.results)
        } catch (error) {
            console.log("Fetch Search Error", error)
        }
    }

    useEffect(() => {
        if(search.length > 0) setShowSearch(true)
        else setShowSearch(false)
        fetchSearch()
    }, [search])
    

  return (
    <nav className="bg-[#121212] py-2">
        <div className="flex justify-between items-center lg:w-[80%] md:w-[90%] w-[95%] mx-auto">
            <div className="flex items-center lg:space-x-16 sm:space-x-8 space-x-1">
                <Link to = "/">
                    <div className="flex flex-col text-yellow-500 sm:scale-100 scale-[70%]">
                        <h1 className="text-[18px] leading-4">ALLABOUT</h1>
                        <h1 className="text-[24px] leading-5 font-semibold">MOVIES</h1>
                    </div>
                </Link>
                <Link to = "/movies">
                    <button className="sm:text-[18px] text-md text-yellow-500 hover:underline">EXPLORE</button>
                </Link>
            </div>
            <div className="relative">
                <input 
                    placeholder="search"
                    className="md:w-[500px] sm:w-[350px] w-[140px] h-10 bg-black text-[#c2c2c2] 
                    md:text-lg sm:text-md text-sm outline-none sm:px-4 px-3 placeholder:text-[#646464] rounded-xl"
                    onChange={handleChange}
                    onClick={()=>toggleShow(true)}
                    onKeyDown={handleKeyPress}
                    type="text" />

                    {
                        showSearch && search.length > 0 && 
                        <div className="absolute top-2 right-2 text-yellow-500 sm:text-2xl text-xl cursor-pointer"
                        onClick={()=>toggleShow(false)}
                        ><IoClose/></div>
                    }

                {showSearch && search.length > 0 && <div className="relative" onClick={()=>toggleShow(false)}>
                    <div className="sm:absolute fixed z-10 left-0 sm:max-w-[500px] w-full bg-zinc-800 rounded-xl">
                        <div className="py-3 pl-5">
                            <div className="flex flex-col gap-2 h-fit max-h-[380px] overflow-y-auto">
                                {searchedList.length>0 && searchedList.map((item,ind)=>
                                    <CarouselMiniCard carouselMovies={searchedList} ind={ind} item={ind}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    </nav>
  )
}

export default Navbar