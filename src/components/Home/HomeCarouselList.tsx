import Movies from "../../pages/Movies"
import { CarouselMovieType } from "../../utils/constant"
import CarouselMiniCardSkeleton from "../Skeleton/CarouselMiniCardSkeleton"
import CarouselMiniCard from "./CarouselMiniCard"

interface HomeCarouselListProps{
    next: number[]
    carouselMovies: CarouselMovieType[]
}

function HomeCarouselList({next, carouselMovies}: HomeCarouselListProps) {

    return (
        <div>
            <h1 className="font-bold text-xl text-yellow-500">Up Next</h1>
            <div className="row">
                {
                    carouselMovies.length > 0 ?
                    next.map((item,ind) =>(
                        <CarouselMiniCard carouselMovies={carouselMovies} item={item} ind={ind}/>
                    ))
                    :
                    [...Array(3)].map(item =>
                        <CarouselMiniCardSkeleton/>
                    )
                }
            </div>
        </div>
  )
}

export default HomeCarouselList