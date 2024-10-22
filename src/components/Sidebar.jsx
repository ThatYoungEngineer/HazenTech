import { useState, useEffect } from "react"

import { MdSpaceDashboard } from "react-icons/md"
import { MdKeyboardArrowRight } from "react-icons/md"
import { PiUserListFill } from "react-icons/pi"
import { FaUsers } from "react-icons/fa"
import { BiSolidDetail } from "react-icons/bi"
import { BiSolidHelpCircle } from "react-icons/bi"
import { MdOutlineHorizontalRule } from "react-icons/md"

import { Link, useLocation } from "react-router-dom"


const Sidebar = () => {
    const [open, setOpen] = useState({dashboard: false, taskManagement: false})
    const [tab, setTab] = useState(null)
    const location = useLocation()

    useEffect(() => {
      const tabFromURL = location.pathname
  
      tabFromURL && setTab(tabFromURL)
    })
    
  return (
    <aside className='min-h-full w-full text-white bg-primary px-4 py-5'>

        <ul className="font-Inter-Regular text-base text-[#A3A6B7] flex flex-col gap-7">
    
          <li className="w-full flex items-center justify-between">
            <div className="w-full flex flex-col">

              <div
                className="w-full flex items-center justify-between cursor-not-allowed"
                // onClick={() => setOpen(prevState => ({
                //   ...prevState,
                //   dashboard: !prevState.dashboard
                // }))}    
              >
                <div className="flex items-center gap-2">
                  <MdSpaceDashboard size={20} />
                  <h3>Dashboards</h3>
                </div>
                <MdKeyboardArrowRight size={20} className={`${open.dashboard && 'rotate-90'} transition-transform ease-in-out duration-300`} />
              </div>              

              <ul
                className={`sidebar-list text-[14px] flex flex-col gap-5 px-5 overflow-hidden transition-all ease-in-out duration-300 ${ open.dashboard ? 'mt-5 max-h-40' : 'max-h-0 overflow-hidden' } `}
                style={{
                  maxHeight: open.dashboard ? '160px' : '0',
                  transition: 'all 300ms ease-in-out',
                }}
              >                    
                <li className="inline-flex items-center gap-2"> <MdOutlineHorizontalRule size={8} /> Item 1</li>
                <li className="inline-flex items-center gap-2"> <MdOutlineHorizontalRule size={8} /> Item 2</li>
                <li className="inline-flex items-center gap-2"> <MdOutlineHorizontalRule size={8} /> Item 3</li>
                <li className="inline-flex items-center gap-2"> <MdOutlineHorizontalRule size={8} /> Item 4</li>
              </ul>            

            </div>
          </li>              

          <li className="w-full flex items-center justify-between">
            <div className="w-full flex flex-col">

              <div 
                className="w-full flex items-center justify-between cursor-pointer"
                onClick={() => setOpen(prevState => ({
                  ...prevState,
                  taskManagement: !prevState.taskManagement
                }))}
              >
                <div className={` flex items-center gap-2 ${(tab === '/absent-resources') ? 'text-white' : 'text-green-300'} `}>
                  <PiUserListFill size={20} />
                  <h3>Administration</h3>
                </div>
                <MdKeyboardArrowRight size={20} className={`${open.taskManagement && 'rotate-90'} ${(tab === 'absent-resources') && 'text-white'} transition-transform ease-in-out duration-300`} />
              </div>

              <ul
                className={`sidebar-list text-[13px] 2xl:text-sm flex flex-col gap-5 px-5 overflow-hidden transition-all ease-in-out duration-300 ${ open.taskManagement ? 'mt-5 max-h-40' : 'max-h-0 overflow-hidden' } `}
                style={{
                  maxHeight: open.taskManagement ? '250px' : '0',
                  transition: 'all 300ms ease-in-out',
                }}
              >                    
                <li className="inline-flex items-center gap-2" style={{ cursor: 'not-allowed'}}> <MdOutlineHorizontalRule size={8} /> Skills Management</li>
                <li className="inline-flex items-center gap-2" style={{ cursor: 'not-allowed'}}> <MdOutlineHorizontalRule size={8} /> User Management</li>
                <li className="inline-flex items-center gap-2" style={{ cursor: 'not-allowed'}}> <MdOutlineHorizontalRule size={8} /> Client Management</li>
                <li className={`inline-flex items-center gap-2`} style={{ cursor: 'not-allowed'}} > <MdOutlineHorizontalRule size={8} /> Project Management</li>
                <Link to="/absent-resources">
                  <li className={`inline-flex items-center gap-2 ${(tab === '/absent-resources') ? 'text-white' : 'text-green-300'} `}> <MdOutlineHorizontalRule size={8} /> Absent or Partial Resource</li>
                </Link>
              </ul>            

            </div>
          </li>              
          
          <li className="w-full flex items-center justify-between cursor-not-allowed">
            <div className="flex items-center gap-2">
              <FaUsers size={20} />
              <h3>Team Management</h3>
            </div>
          </li>              

          <Link to='/task-management'>
            <li className={`w-full flex items-center justify-between cursor-pointer ${(tab === '/' || tab === '/task-management' || tab === '/create-task' ) ? 'text-white' : 'text-green-300'} `} >
              <div className="flex items-center gap-2">
                <BiSolidDetail size={20} />
                <h3>Task Management</h3>
              </div>
            </li>        
          </Link>

          <li className="w-full flex items-center justify-between cursor-not-allowed">
            <div className="flex items-center gap-2">
              <BiSolidHelpCircle size={20} />
              <h3>Help</h3>
            </div>
          </li>              
        </ul>
    </aside> 
  )
}

export default Sidebar