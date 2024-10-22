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
      <section className='w-64 2xl:w-72 max-w-72 h-full pl-4 flex items-center justify-between'>
        <Link to='/'>
          <img src={Logo} alt="Hazen Tech" className='cursor-pointer' />
        </Link>
        <RxHamburgerMenu size={30} color='#AAAAAA' className='cursor-pointer' onClick={updateSidebar} />
      </section>
      <section className='w-72 max-w-72 h-full pr-4 flex items-center justify-end gap-5'>
        <span className='relative cursor-not-allowed'>
          <IoMdNotificationsOutline size={26} color='#495057' />
          <span className='absolute -top-1 -right-[9px] text-xs FlexCenter text-white bg-[#CB4B6C] font-Inter-SemiBold font-bold w-5 h-5 rounded-full'>1</span>
        </span>
        <div className='flex items-center gap-2 cursor-not-allowed'>
          <img src={User} alt="User Image" className='rounded-full w-7 h-7' />
          <h2 className='font-Inter-Regular text-sm text-[#495057]'>Mitchell Williamson</h2>
          <MdKeyboardArrowDown size={30} color='#989898'/>
        </div>
      </section>
    </section>
  )
}

export default Header