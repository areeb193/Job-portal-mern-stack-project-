import React from 'react'
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";


const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#6A38C2] via-[#7d4ae4] to-[#F83002] text-white mt-12">
      {/* Decorative lights */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">InternshipPortal</span>
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-md">
              Find your dream job, apply easily, and track your applications.
            </p>
            <span className="mt-2 text-xs md:text-sm text-white/70">
              Developed with <span className="text-white">❤️</span> by <span className="font-semibold">Areeb and Ali</span>
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 text-white/80">Quick Links</h3>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="cursor-pointer rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur px-3 py-1.5 transition-all duration-300">
                <a href="/" className="hover:underline">Home</a>
              </Badge>
              <Badge variant="secondary" className="cursor-pointer rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur px-3 py-1.5 transition-all duration-300">
                <a href="/jobs" className="hover:underline">Jobs</a>
              </Badge>
              <Badge variant="secondary" className="cursor-pointer rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur px-3 py-1.5 transition-all duration-300">
                <a href="/companies" className="hover:underline">Companies</a>
              </Badge>
              <Badge variant="secondary" className="cursor-pointer rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur px-3 py-1.5 transition-all duration-300">
                <a href="/contact" className="hover:underline">Contact</a>
              </Badge>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 text-white/80">Follow Us</h3>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <a href="https://github.com/areeb193" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.89.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.57.23 2.73.11 3.02.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2v3.26c0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/></svg>
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.07-.93-1.5-1.5-1.5s-1.5.43-1.5 1.5v4.5h-3v-9h3v1.22c.41-.63 1.19-1.22 2.5-1.22 2.07 0 3.5 1.34 3.5 4.08v5.92z"/></svg>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/15 text-center">
          <p className="text-xs md:text-sm text-white/80">&copy; {new Date().getFullYear()} <span className="font-semibold">InternshipPortal</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer