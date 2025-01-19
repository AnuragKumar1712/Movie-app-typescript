import React from 'react'

function MovieCardSkeleton() {
    return (
            <div className="col">
                <div className={`my-2 border-2 border-zinc-800 rounded-lg overflow-hidden`}>
                    <div className="relative overflow-hidden">
                        <div className="aspect-[3/4] w-full placeholder"></div>
                        <div className="absolute -bottom-6 w-full h-28 _carouselGradient"></div>
                    </div>
                    <div className="bg-[#222] p-2">
                        <h1 className={`md:text-[17px] text-sm w-[80%] placeholder`}></h1>
                        <div className="md:text-[15px] text-[13px] text-zinc-300 mt-2">
                            <h1 className='placeholder w-[90%]'></h1>
                            <h1 className='placeholder w-[80%]'></h1>
                            <h1 className='placeholder w-[40%]'></h1>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MovieCardSkeleton