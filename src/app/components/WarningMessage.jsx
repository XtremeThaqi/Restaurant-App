"use client"

import React, { useState } from 'react'
import { IoIosWarning } from "react-icons/io";
import { FaTimes } from 'react-icons/fa';

export default function WarningMessage() {
    const [isVisible, setIsVisible] = useState(true)

    const handleRemove = () => {
        setIsVisible(false) // when clicked set the visibility to false to hide the message from the screen
    }

    return (
        <>
            {isVisible && (
                <header className='bg-orange-600 text-white py-2'>
                    <div className="flex justify-center items-center mx-10">
                        <div className="flex gap-4 items-center max-sm:gap-2">
                            <IoIosWarning className='text-3xl max-sm:text-5xl' />
                            <p className="font-bold text-sm text-center max-sm:text-xs">Warning! This website is a mockup for a non-existing restaurant. No services are offered.</p>
                            <FaTimes className="text-3xl font-bold cursor-pointer" onClick={handleRemove} />
                        </div>
                    </div>
                </header>
            )}
        </>
    )
}
