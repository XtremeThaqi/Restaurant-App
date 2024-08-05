"use client"

export default function Footer() {
    return (
        <>
            <div className="flex flex-col px-10 py-2 items-center w-full bg-[rgba(31,31,31,0.3)]">
                <div className="flex flex-wrap gap-20">
                    <div className="relative">
                        <h2 className="text-2xl text-orange-600 before:absolute before:top-7 before:bg-orange-600 before:w-28 before:h-[2px]">&quot;BLINI&quot;</h2>
                    </div>
                    <div className="flex flex-wrap gap-20 ml-52 max-xl:ml-5 max-sm:gap-10">
                        <div className="text-2xl text-orange-600">
                            <h2>Address</h2>
                            <p className="text-[16px] text-zinc-400">Rr. Arben Ahmeti nr: 18</p>
                            <p className="text-[16px] ">Lipjan, Kosovo</p>
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
                <div className="text-center mt-12">
                        <p className="text-orange-600 text-[13px]">&copy; Copyright 2024 Powered by <span className="underline italic"> Blini</span></p>

                    </div>
            </div>
        </>
    )
}
