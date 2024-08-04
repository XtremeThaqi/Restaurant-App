"use client"

import { FaStar } from "react-icons/fa";

import Image from "next/image";
import img1 from './images/testemonials-1.jpg';
import img2 from './images/testemonials-2.jpg';
import img3 from './images/testemonials-3.jpg';

export default function Testemonials() {

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
        <div className="py-20" id="testemonials">
            <div className="flex justify-center items-center">
                <div className="text-orange-600 underline text-3xl max-sm:text-3xl">Testemonials</div>
            </div>
            <div className="mt-16 flex flex-wrap w-auto gap-5 justify-center items-center">
                {testimonialsData.map((testimonial) => (
                    <div key={testimonial.id} className="rounded-2xl w-[330px] h-[440px] border border-orange-600 p-5 flex flex-wrap justify-center">
                        <div className="relative flex flex-col gap-2 items-center">
                            <Image className="max-w-24" src={testimonial.image} alt={testimonial.name}/>
                            <p className="text-xl text-orange-600">{testimonial.name}</p>
                            <p className="text-lg mt-4 text-gray-400">{testimonial.description}</p>
                            <p className="absolute right-0 -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                            <p className="absolute right-7 -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                            <p className="absolute right-14 -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                            <p className="absolute right-[85px] -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                            <p className="absolute right-[115px] -bottom-0 text-[20px] text-orange-600"><FaStar/></p>
                        </div>
                    </div>
                ))}   
            </div>
        </div>
    </>
  )
}

 {/* <div className="flex p-5 gap-5 flex-wrap justify-center items-center mt-16">
                <div className="border border-orange-600 rounded-3xl w-[500px] p-5 flex  items-center">
                    <div className="flex flex-col gap-4 mr-5">
                        <Image src={img1} alt="img-1" className="w-20 pointer-events-none object-cover" />
                        <h2 className="text- mt-2 text-orange-600"></h2>
                    </div>
                    <p className="text-gray-400 text-md mt-4"></p>
                </div>
                <div className="border border-orange-600 rounded-3xl w-[500px] p-5 flex items-center">
                    <div className="flex flex-col">
                        <Image src={img2} alt="img-2" className="w-20 pointer-events-none object-cover" />
                        <h2 className="text-2xl mt-2 text-orange-600">Mary F</h2>
                    </div>
                    <p className="text-gray-400 text-md mt-4">This was my first visit to Pietro’s and it was a wonderful experience! The food was delicious, the service was friendly and efficient and the atmosphere was great. I highly recommend it!</p>
                </div>
            </div> */}