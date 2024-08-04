"use client"

export default function Footer() {
    return (
        <>
            <div className="px-24 max-lg:px-10 h-[300px] w-full bg-[rgba(31,31,31,0.3)]">
                <div className="flex gap-32 py-5 max-md:flex-col max-md:gap-10">
                    <div className="relative">
                        <h2 className="text-2xl text-orange-600 before:absolute before:top-7 before:bg-orange-600 before:w-32 before:h-[2px]">"BLINI"</h2>
                    </div>
                    <div className="flex flex-wrap justify-start gap-32 max-md:gap-20 max-sm:flex-col max-sm:gap-10">
                        <div className="text-2xl text-orange-600">
                            <h2>Address</h2>
                            <p className="text-[16px] text-zinc-400">Rr. Arben Ahmeti nr: 18</p>
                            <p className="text-[16px] text-zinc-400">Lipjan, Kosovo</p>
                        </div>
                        <div className="text-2xl text-orange-600">
                            <h2>Details</h2>
                            <a href="#food" className="text-[16px] underline text-zinc-400">Menu</a>
                            <a href="#time" className="text-[16px] underline block text-zinc-400">Time</a>
                        </div>
                        <div className="text-2xl text-orange-600">
                            <h2>Contact</h2>
                            <p className="text-[16px] text-zinc-400">+(383)45282442</p>
                            <p className="text-[16px] -mt-2 text-zinc-400">erblinthaqi40@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-end py-5 mt-24 max-md:mt-10 max-sm:mt-0 max-md:py-2">
                    <div className="flex gap-5">
                        <p className="text-orange-600 text-[13px]">&copy; Copyright 2024 Powered By <span className="underline italic">BLINI</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}
