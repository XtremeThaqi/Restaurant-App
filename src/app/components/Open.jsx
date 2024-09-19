"use client"

import { motion } from "framer-motion"

export default function Open() {

    const OpenData = [
        { id: 1, title: 'Monday - Friday',
            time: '9:00 AM - 9:00 PM',
        },
        { id: 2, title: 'Saturday - Sunday',
            time: '11:00 AM - 7:00 PM',
        }
    ]

    return (
        <>
            <div className="py-32" id="time">
                <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1, delay: 0.2 }}
                 className="flex items-center justify-center">
                    <h2 className="text-3xl text-orange-600 underline">Open from:</h2>
                </motion.div>
                <div className="flex justify-center items-center gap-5 mt-10 px-10 max-md:flex-col">
                    {OpenData.map((from) => (
                        <motion.div
                         initial={{ opacity: 0, x: -50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         transition={{ duration: 1, delay: 0.2 }}
                         key={from.id} className="flex flex-col p-4 gap-3 border border-orange-600 rounded-md w-[400px] max-[450px]:w-[300px]">
                            <h3 className="text-lg text-orange-600">{from.title}</h3>
                            <p className="text-lg text-gray-600">{from.time}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}
