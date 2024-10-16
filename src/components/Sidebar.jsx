import { useState } from "react"
import { MdSpaceDashboard } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"
import { PiUserListFill } from "react-icons/pi"
import { FaUsers } from "react-icons/fa"
import { BiSolidDetail } from "react-icons/bi"
import { BiSolidHelpCircle } from "react-icons/bi"

const Sidebar = () => {
    const [active, setActive] = useState({dashboard: false, taskManagement: false})

  return (
    <section className='h-[95vh] w-[20vw] max-w-[20vw] text-white bg-primary px-4 py-5'>
        <ul className="font-Inter-Regular text-base text-[#A3A6B7] flex flex-col gap-7">
          <li className="w-full flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <MdSpaceDashboard size={20} />
              <h3>Dashboards</h3>
            </div>
            <MdKeyboardArrowRight size={20} />
          </li>              
          <li className="w-full flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <PiUserListFill size={20} />
              <h3>Administration</h3>
            </div>
            <MdKeyboardArrowRight size={20} />
          </li>              
          <li className="w-full flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <FaUsers size={20} />
              <h3>Team Management</h3>
            </div>
          </li>              
          <li className="w-full flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <BiSolidDetail size={20} />
              <h3>Task Management</h3>
            </div>
          </li>              
          <li className="w-full flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <BiSolidHelpCircle size={20} />
              <h3>Help</h3>
            </div>
          </li>              
        </ul>
    </section> 
  )
}

export default Sidebar