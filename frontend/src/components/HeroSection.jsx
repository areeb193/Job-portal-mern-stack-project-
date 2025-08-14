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
  const headingRef = useRef(null);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

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
    <div className="relative overflow-hidden text-center rounded-2xl bg-gradient-to-br from-white to-white/60">
      {/* subtle animated gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#6A38C2]/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#F83002]/10 blur-3xl animate-pulse" />

      <div className="relative flex flex-col gap-5 my-10 px-4">
        <span className="mx-auto px-4 py-2 rounded-full bg-white/80 backdrop-blur text-[#F83002] font-medium ring-1 ring-black/5 shadow-sm">
          No 1 Intership Hunt Website
        </span>

        <h1 ref={headingRef} className="text-3xl md:text-5xl font-extrabold tracking-tight">
          <span className="hero-animate">Search, Apply &</span>
          <br />
          Get Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6A38C2] to-[#F83002] hero-animate">First Intership</span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 mt-2">
          A modern job portal with user authentication, Internship posting, company
          profiles, and application tracking — developed by Areeb & Ali.
        </p>

        <div className="flex w-full max-w-xl bg-white/90 backdrop-blur ring-1 ring-black/5 focus-within:ring-[#6A38C2]/40 focus-within:shadow-lg pl-3 rounded-full items-center gap-2 md:gap-4 mx-auto transition-all">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="find your dream Internship"
            className="outline-none border-none w-full bg-transparent py-3 px-2"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white rounded-full md:rounded-r-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
