import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { animate } from "animejs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      animate(".hero-animate", {
        opacity: [0, 1],
        translateY: [50, 0],
        delay: (el, i) => i * 100,
        duration: 1200,
        easing: "out(3)",
      });
    }
  }, []);
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No 1 Intership Hunt Website
        </span>
        <h1 ref={headingRef} className="text-5xl font-bold">
          <span className="hero-animate">Search, Apply &</span>
          <br />
          Get Your{" "}
          <span className="text-[#6A38C2] hero-animate">First Intership</span>
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          A modern job portal with user authentication, Internship posting, company
          profiles, and application tracking — developed by Areeb & Ali.
        </p>
        <div className="flex w-full max-w-xl shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="find your dream Internship"
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-[#6A38C2] text-white rounded-r-full  hover:bg-[#7840b0]"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
