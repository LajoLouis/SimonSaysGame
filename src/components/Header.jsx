import { GiGamepad } from "react-icons/gi";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";

function Header() {
  const [showHow, setShowHow] = useState(false)
  return (
    <div>
        
        <div className="text-teal-950 custom-gradient">
          <div>
            
          </div>
          <div className="flex p-[15px] relative justify-center text-[34px] font-extrabold text-black custom-gradient">
            <BiMenu className='text-3xl text-teal-950 cursor-pointer absolute top-0 left-0 ml-7' onClick={()=>setShowHow(!showHow)}/>
            <h1>Simon Says</h1>
            <GiGamepad className="text-5xl"/>
          </div>
        </div>
        <div className= {`fixed top-[80px] h-screen left-0 bg-white text-black transition-all duration-200 ${showHow ? "w-[200px] visible": "w-0 hidden"}`}>
          <ol className="p-[20px] list-disc flex flex-col space-y-5">
            <li>Click on the switch to start game</li>
            <li>Allow the colors to shine finish</li>
            <li>Select the colors in the exact order for you to increaase your points</li>
            <li>Repeat the process</li>
          </ol>
        </div>
    </div>
  )
}

export default Header