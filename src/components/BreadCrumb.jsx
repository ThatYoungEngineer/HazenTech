import { IoHome } from "react-icons/io5"
import { PiLineVertical } from "react-icons/pi"
import { Link } from "react-router-dom"

const BreadCrumb = ({route}) => {
  return (
    <div className="flex items-center">
        <Link to='/'>
            <IoHome color="#00457C" size={25} />
        </Link>
        <PiLineVertical color="#00457C" size={25} className="rotate-12" />
        <h2 className="text-[#00457C] font-Inter-Regular text-sm">{route}</h2> 
    </div>
  )
}

export default BreadCrumb