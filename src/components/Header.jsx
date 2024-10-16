import Logo from '../assets/images/logo.png'
import User from '../assets/images/user.png'
import { RxHamburgerMenu } from "react-icons/rx"
import { IoMdNotificationsOutline } from "react-icons/io"
import { MdKeyboardArrowDown } from "react-icons/md"

const Header = () => {
  return (
    <section className='w-screen h-[10vh] bg-white header-shadow flex items-center justify-between'>
      <section className='w-[20vw] h-full pl-4 flex items-center justify-between'>
        <img src={Logo} alt="Hazen Tech" className='object-cover cursor-pointer' />
        <RxHamburgerMenu size={30} color='#AAAAAA' className='cursor-pointer' />
      </section>
      <section className='w-fit h-full pr-4 flex items-center justify-end gap-5'>
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