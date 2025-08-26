import React from 'react'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }from './ui/carousel'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
const category =[
    "Software Development",
    "Data Science",
    "Marketing & Sales",
    "Finance & Accounting",
    "Human Resources",
    "Project Management",
    "Customer Support",
    "Engineering",
    "Healthcare",
]
const CategoryCarousel = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
    const searchJobHandler=(query)=>{
        dispatch(setSearchedQuery(query));
        navigate("/browse");
         }
    return (
        <div>
                <Carousel className="w-full max-w-4xl mx-auto my-16 px-2">
                        <CarouselContent className="-ml-2">
                {
                    category.map((cat, index) => (
                                                <CarouselItem key={index} className='pl-2 basis-3/4 sm:basis-1/2 lg:basis-1/3'>
                                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full bg-white/90 backdrop-blur ring-1 ring-black/5 hover:ring-[#6A38C2]/30 hover:-translate-y-0.5 transition-all duration-300">
                                                    <span className="inline-flex items-center gap-2">
                                                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#F83002]" />
                                                        {cat}
                                                    </span>
                                                </Button>
                        </CarouselItem>
                    ))
                }
            
            </CarouselContent>
                        <CarouselPrevious className="rounded-full bg-white/90 backdrop-blur ring-1 ring-black/5 hover:bg-white shadow hover:shadow-md"/>
                        <CarouselNext className="rounded-full bg-white/90 backdrop-blur ring-1 ring-black/5 hover:bg-white shadow hover:shadow-md"/> 
        </Carousel>
    </div>
  )
}

export default CategoryCarousel
