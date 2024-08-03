"use client"
import Image from "next/image";
import image from './images/image-bg.jpg';

export default function Hero() {
  return (
    <>
      <div className="h-screen relative flex justify-center items-center z-10">
        <div className="flex justify-center w-full">
          <Image src={image} alt="image" className="w-full h-full object-cover pointer-events-none" layout="fill" />
          <div className="absolute top-[400px] left-20">
            <h1 className="text-5xl font-bold text-white">Welcome To Restaurant <span className="line-through block text-[80px] font-serif">BLINI</span></h1>
          </div>
          <div className="absolute top-[530px] left-20">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-md transition-all duration-100 ease-linear">See Our Menu</button>
          </div>
        </div>
      </div>
    </>
  )
}