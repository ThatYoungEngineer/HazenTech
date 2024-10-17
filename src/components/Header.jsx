import Logo from '../assets/images/logo.png'
import User from '../assets/images/user.png'
import { RxHamburgerMenu } from "react-icons/rx"
import { IoMdNotificationsOutline } from "react-icons/io"
import { MdKeyboardArrowDown } from "react-icons/md"

import { useSidebar } from "../context/sidebarContext"
import { Link } from 'react-router-dom'

const Header = () => {
  const { updateSidebar } = useSidebar()
  return (
    <section className='w-screen py-4 bg-white header-shadow flex items-center justify-between'>
      <section className='w-[20vw] max-w-72 h-full pl-4 flex items-center justify-between'>
        <Link to='/'>
          <img src={Logo} alt="Hazen Tech" className='cursor-pointer' />
        </Link>
        <RxHamburgerMenu size={30} color='#AAAAAA' className='cursor-pointer' onClick={updateSidebar} />
      </section>
      <section className='w-fit max-w-72 h-full pr-4 flex items-center justify-end gap-7'>
        <span className='relative cursor-pointer'>
          <IoMdNotificationsOutline size={30} color='#' />
          <span className='absolute -top-2 -right-[11px] text-xs FlexCenter text-white bg-[#CB4B6C] font-Inter-SemiBold font-bold w-6 h-6 rounded-full'>1</span>
        </span>
        <div className='flex items-center gap-2 cursor-pointer'>
          <img src={User} alt="User Image" className='rounded-full w-10 h-10' />
          <h2 className='font-Inter-Regular text-sm text-[#495057]'>Mitchell Williamson</h2>
          <MdKeyboardArrowDown size={30} color='#989898'/>
        </div>
      </section>
    </section>
  )
}

export default Header