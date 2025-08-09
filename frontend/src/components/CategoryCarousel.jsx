import React from 'react'
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }from './ui/Carousel'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
const category =[
    "Software Development",
    "Data Science",
    "Design & Creative",
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
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((cat, index) => (
                        <CarouselItem key={index} className='md:basis-1/2 lg-basis-1/3'>
                        <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                        </CarouselItem>
                    ))
                }
            
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/> 
        </Carousel>
    </div>
  )
}

export default CategoryCarousel