"use client"

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false)

    const toggle = () => {
        setMobileMenu(!mobileMenu)
    }

    const navData = [
        { id: 1, name: "Food", href: "#food"},
        { id: 2, name: "About", href: "#about"},
        { id: 3, name: "Testemonials", href: "#Testemonials"},
        { id: 4, name: "Contact Us", href: "#contact"},
    ]

    return (
        <>
            <nav className="fixed top-0 py-5 w-full z-20 /*bg-[rgba(31,31,31,0.9)]*/ backdrop-blur-lg">
                <div className="flex justify-between px-10 items-center relative">
                    <a href="/" className="cursor-pointer text-[30px] font-bold text-white line-through font-serif">BLINI</a>
                    <ul className="flex items-center gap-7 max-md:hidden">
                        {navData.map((item) => (
                            <li className="text-white cursor-pointer text-[17px]" key={item.id}>
                                <a href={item.href}>{item.name}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="md:hidden mt-2">
                        <button className="text-white text-[27px]" onClick={toggle}>
                            {mobileMenu ? <FaTimes/> : <FaBars/>}
                        </button>
                        {mobileMenu && (
                            <div className="absolute top-[60px] left-0 w-full px-10 py-5 rounded-[5px] max-sm:bg-[rgba(31,31,31,0.9)] backdrop-blur-md">
                                <ul className="flex flex-col gap-7">
                                    {navData.map((item) => (
                                        <li className="text-white cursor-pointer text-[20px]" key={item.id}>
                                            <a href={item.href}>{item.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}