
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Contact() {

  return (
    <>
        <div className="py-20" id="contact">
            <div className="flex justify-center items-center">
                <h2 className="text-orange-600 text-3xl underline">Contact Us</h2>
            </div>
            <div className="grid grid-cols-2 place-items-center max-[1100px]:grid-cols-1 mt-20">
                <div className="flex flex-col gap-5 ml-32 max-lg:ml-0">
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
                </div>
                <form className="p-5 w-[500px] max-sm:w-[350px] border border-orange-600 rounded-sm mt-16 max-[]:">
                    <div className="flex justify-center items-center">
                        <h2 className="text-orange-600 text-3xl">Contact Us!</h2>
                    </div>
                    <div className="mt-5 flex flex-col gap-5">
                        <input type="text" id="text" placeholder="Enter Full Name" className="p-3 bg-transparent outline-none text-orange-600 rounded-sm border border-orange-600 focus:border-2 placeholder:text-orange-600" required/>
                        <input type="email" id="email" placeholder="Enter Email" className="p-3 bg-transparent outline-none text-orange-600 rounded-sm border border-orange-600 focus:border-2 placeholder:text-orange-600" required/>
                    </div>
                    <div className="grid grid-cols-2 mt-5 gap-5">
                        <input type="tel"  placeholder="123-456-789" className="p-3 bg-transparent outline-none text-orange-600 rounded-sm border border-orange-600 focus:border-2 placeholder:text-orange-600" required/>
                        {/* <textarea cols="10" rows="1" placeholder="How Many People?" className="mt-[1px] bg-transparent border border-orange-600 text-orange-600 outline-none p-3 placeholder:text-orange-600 overflow-hidden resize-none rounded-sm focus:border-2"/> */}
                        <select className="bg-transparent border outline-none border-orange-600 text-orange-600 px-5 text-[20px]">
                            <option value="1" className="bg-orange-600 text-white">1</option>
                            <option value="2">2</option>
                            <option value="3" className="bg-orange-600 text-white">3</option>
                            <option value="4">4</option>
                            <option value="5" className="bg-orange-600 text-white">5</option>
                            <option value="6">6</option>
                            <option value="7" className="bg-orange-600 text-white">7</option>
                            <option value="8">8</option>
                            <option value="9" className="bg-orange-600 text-white">9</option>
                            <option value="10">10</option>
                            <option value="11" className="bg-orange-600 text-white">11</option>
                            <option value="12">12</option>
                            <option value="13" className="bg-orange-600 text-white">13</option>
                            <option value="14">14</option>
                            <option value="15" className="bg-orange-600 text-white">15</option>
                        </select>
                    </div>
                    <button className="w-full p-3 text-orange-600 bg-transparent border rounded-sm border-orange-600 mt-5">Book A Table Now</button>
                </form>
            </div>
        </div>
    </>
  )
}
