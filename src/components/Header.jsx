import { GiGamepad } from "react-icons/gi";

function Header() {
  return (
    <div>
        <div className="flex p-[15px] justify-center text-[34px] font-extrabold text-teal-950 custom-gradient">
        <h1>Simon Says</h1>
        <GiGamepad className="text-5xl"/>
        </div>
    </div>
  )
}

export default Header