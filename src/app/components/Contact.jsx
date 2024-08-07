"use client"

import { motion } from "framer-motion";

import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Contact() {

  return (
    <>
        <div className="py-24" id="contact">
            <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="flex justify-center items-center">
                <h2 className="text-orange-600 text-3xl underline">Contact Us</h2>
            </motion.div>
            <div className="grid grid-cols-2 place-items-center max-[1100px]:grid-cols-1 mt-20">
                <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1, delay: 0.2 }}
                 className="flex flex-col gap-5 ml-32 max-lg:ml-0">
                    <div className="flex items-center gap-2">
                        <IoLocationSharp className="text-orange-600 text-[20px]" />
                        <h2 className="text-orange-600 text-[18px]">Kosovo, Lipjan</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaPhone className="text-orange-600 text-[20px]" />
                        <h2 className="text-orange-600 text-[18px]">(+383)45-282-442</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoIosMail className="text-orange-600 text-[20px]" />
                        <h2 className="text-orange-600 text-[18px]">erblinthaqi40@gmail.com</h2>
                    </div>
                </motion.div>
                <motion.form
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1, delay: 0.2 }}
                 className="p-5 w-[500px] max-sm:w-[350px] border border-orange-600 rounded-sm mt-16 max-[]:">
                    <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 1, delay: 0.2 }}
                    className="flex justify-center items-center">
                        <h2 className="text-orange-600 text-3xl">Contact Us!</h2>
                    </motion.div>
                    <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 1, delay: 0.2 }}
                     className="mt-5 flex flex-col gap-5">
                        <input type="text" id="text" placeholder="Enter Full Name" className="p-3 bg-transparent outline-none text-orange-600 rounded-sm border border-orange-600 focus:border-2 placeholder:text-orange-600" required/>
                        <input type="email" inputMode="email" id="email" placeholder="Enter Email" className="p-3 bg-transparent outline-none text-orange-600 rounded-sm border border-orange-600 focus:border-2 placeholder:text-orange-600" required/>
                    </motion.div>
                    <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 1, delay: 0.2 }}
                     className="grid grid-cols-2 mt-5 gap-5">
                        <input type="tel" inputMode="tel" placeholder="123-456-789" className="p-3 bg-transparent outline-none text-orange-600 rounded-sm border border-orange-600 focus:border-2 placeholder:text-orange-600" required/>
                        <input type="text" inputMode="numeric" placeholder="How many?" className="mt-[1px] bg-transparent border border-orange-600 text-orange-600 outline-none p-3 placeholder:text-orange-600 overflow-hidden resize-none rounded-sm focus:border-2" />
                    </motion.div>
                    <motion.button
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 1, delay: 0.2 }}
                     className="w-full p-3 text-orange-600 bg-transparent border rounded-sm border-orange-600 mt-5">Book A Table Now</motion.button>
                </motion.form>
            </div>
        </div>
    </>
  )
}
