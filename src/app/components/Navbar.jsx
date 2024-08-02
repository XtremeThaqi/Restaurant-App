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
            <nav className="fixed top-5 px-12 py-5 w-screen /*bg-[rgba(31,31,31,0.9)]*/ backdrop-blur-lg">
                <div className="flex justify-between items-center relative">
                    <a href="/" className="cursor-pointer text-[30px] font-bold text-white line-through font-serif">BINI</a>
                    <ul className="flex items-center gap-7 max-md:hidden">
                        {navData.map((item) => (
                            <li className="text-white cursor-pointer" key={item.id}>
                                <a href={item.href}>{item.name}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="md:hidden">
                        <button className="text-white text-[27px]" onClick={toggle}>
                            {mobileMenu ? <FaTimes/> : <FaBars/>}
                        </button>
                        {mobileMenu && (
                            <div className="absolute left-0 w-full p-5 rounded-[5px] backdrop-blur-lg">
                                <ul className="flex flex-col gap-5 mt-2">
                                    {navData.map((item) => (
                                        <li className="text-white cursor-pointer" key={item.id}>
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