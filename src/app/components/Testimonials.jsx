"use client"

import { motion } from "framer-motion"

import { FaStar } from "react-icons/fa";

import Image from "next/image";
import img1 from './images/testemonials-1.jpg';
import img2 from './images/testemonials-2.jpg';
import img3 from './images/testemonials-3.jpg';

export default function Testimonials() {

    const testimonialsData = [
        { id: 1, name: 'Norbert A', image: img1,
            description: 'This was my first visit to BLINI and it was a wonderful experience! The food was delicious, the service was friendly and efficient and the atmosphere was great. I highly recommend it!'
        },
        { id: 2, name: 'Linda F', image: img2,
            description: 'I love this place great food, great atmosphere and a great staff. Very accommodating and great service. Do yourself a favor and treat yourself here you wont be sorry.'
        },
        { id: 3, name: 'John D', image: img3,
            description: 'First time here and we loved it!! Service was amazing and the bussers were right there for anything we needed. We never had to ask for anything. Great job Blini. We had such great service I forgot to mention the food was yummy!'
        },
    ]

  return (
    <>
        <div className="py-20" id="testimonials">
            <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="flex justify-center items-center">
                <div className="text-orange-600 underline text-3xl max-sm:text-3xl">Testimonials</div>
            </motion.div>
            <div className="mt-16 flex flex-wrap w-auto gap-5 justify-center items-center">
                {testimonialsData.map((testimonial) => (
                    <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 1, delay: 0.2 }}
                     key={testimonial.id} className="rounded-2xl w-[330px] h-[440px] border border-orange-600 p-5 flex flex-wrap justify-center">
                        <div className="relative flex flex-col gap-2 items-center">
                            <Image className="max-w-24 rounded-full" src={testimonial.image} alt={testimonial.name}/>
                            <p className="text-xl text-orange-600">{testimonial.name}</p>
                            <p className="text-lg mt-4 text-gray-400">{testimonial.description}</p>
                            <p className="absolute right-0 -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                            <p className="absolute right-7 -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                            <p className="absolute right-14 -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                            <p className="absolute right-[85px] -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                            <p className="absolute right-[115px] -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                        </div>
                    </motion.div>
                ))}   
            </div>
        </div>
    </>
  )
}