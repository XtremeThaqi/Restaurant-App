"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import aboutImg from './images/about-img.webp'

export default function About() {
  return (
    <>
      <div className="py-24 overflow-hidden" id="about">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center items-center">
          <h1 className="text-4xl text-orange-600 underline">About Us</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-2 mt-20 p-5 max-lg:grid-cols-1">
          <Image src={aboutImg} alt="about-img" className="h-[400px] w-full object-cover rounded-xl" />
          <div className="p-10 flex flex-col items-start gap-2 max-lg:p-5">
            <p className="text-2xl text-white font-serif font-medium max-sm:text-[20px]">Welcome to Restaurant <span className="font-serif">BLINI</span> where we serve more than just food – we serve unforgettable experiences. Nestled in the heart of Kosovo, our restaurant has become a beloved spot for locals and visitors alike. Join us for a culinary journey where every bite leaves a lasting impression. Experience our restaurant where every meal is a masterpiece.</p>
            <a href="#contact" className="mt-10 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-[10px] px-8 rounded-md transition-all duration-100 ease-linear max-sm:text-[14px]">Contact Us</a>
          </div>
        </motion.div>
      </div>
    </>
  )
}
