"use client"
import Image from "next/image";
import image from './images/image-bg.jpg';

export default function Hero() {
  return (
    <>
      <div className="h-screen relative flex justify-center items-center z-10">
        <div className="flex justify-center w-full">
          <Image src={image} alt="image" className="w-full h-full object-cover pointer-events-none" layout="fill" />
          <div className="absolute bottom-[200px] left-20 max-sm:left-10">
            <h1 className="text-5xl font-bold text-white max-md:text-4xl max-sm:text-3xl">Welcome To Restaurant <span className="line-through block text-[80px] font-serif max-md:text-[60px] max-md:mt-3 max-sm:text-[50px]">BLINI</span></h1>
            <div className="mt-5">
              <a href="#food" className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-[11px] px-8 rounded-md transition-all duration-100 ease-linear max-sm:text-[14px]">See Our Menu</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}