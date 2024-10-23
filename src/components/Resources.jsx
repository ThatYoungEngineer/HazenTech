import { useState, useRef, useEffect } from 'react'

import { BiSolidCommentAdd } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { IoTriangle } from "react-icons/io5"
import { GoTriangleDown } from 'react-icons/go'

import { Dropdown } from 'primereact/dropdown'
import { OverlayPanel } from 'primereact/overlaypanel'

import AddComment from './AddComment'

import clarify from '../assets/images/clarify.png'


const users = [
    { id: 9, name: "John Berg", theme: '#3DCE1E', availability: null },
    { id: 2, name: "Lara Croft", theme: '#1876D2', availability: null },
    { id: 3, name: "Heisenberg", theme: '#3DCE1E', availability: null },
    { id: 4, name: "Mr. White", theme: '#3DCE1E', availability: '07:00 hours' },
    { id: 5, name: "John Wick", theme: '#E9C50C', availability: null },
    { id: 6, name: "Ali Ahmed", theme: '#3DCE1E', availability: null },
    { id: 8, name: "Lars Alex", theme: '#1876D2', availability: null },
    { id: 89, name: "Lars Alex", theme: '#1876D2', availability: null },
    { id: 11, name: "Lars Alex", theme: '#1876D2', availability: null },
    { id: 12, name: "Mary Alex", theme: '#3DCE1E', availability: null },
    { id: 14, name: "Lars Alex", theme: '#1876D2', availability: null },
    { id: 50, name: "Lars Alex", theme: '#1876D2', availability: null },
]

const clerks = [
    { id: 1, label: "Clerk 01" },
    { id: 2, label: "Clerk 02" },
    { id: 3, label: "Clerk 03" }
]

const Resources = ( { allocateResources, tasks } ) => {
    const [selectedClerk, setSelectedClerk] = useState(null)
    const [scroll, setScroll] = useState(true)
    const op = useRef(null)

    useEffect( () => {
        const resourcesSection = document.getElementById("resourcesSection")

        if (resourcesSection) {
            if (scroll == false) {
                document.getElementById("resourcesSection").style.overflowY = 'hidden'
            } else {
                document.getElementById("resourcesSection").style.overflowY = 'scroll'
            }    
            return () => {
                document.getElementById("resourcesSection").style.overflowY = 'scroll'
            }
        }
    }, [scroll])

    const handleCommentClick = (e) => {
        op.current.toggle(e)
        setScroll(false)
    }

    const handleOverlayClose = () => {
        setScroll(true); // Restore scroll when overlay is closed
    }

  return (
    <>
        <div className="w-full flex items-center justify-between bg-[#E6EDF2] p-4 border rounded-t-md border-[#E2E2E2]">
            <h2 className="font-Inter-Regular text-sm text-[#3E3E3E]"> Available Resources </h2>
            <span className="cursor-not-allowed opacity-50">
                <IoMdAddCircle  color="#00457C" size={25} />
            </span>
        </div>
        {allocateResources 
        ?   <> 
                <div className="w-full flex items-center justify-between bg-[#F7F7F7] p-3 border-b border-x border-[#E2E2E2]">
                    <h2 className="font-Inter-Regular text-sm text-[#3E3E3E]"> Resources </h2>
                    <h2 className="font-Inter-Regular text-sm text-[#3E3E3E]"> Task Division </h2>
                </div>
                <main className="py-3 px-2 h-[70vh] 2xl:h-[30rem] w-full flex flex-col justify-between border-[#E2E2E2] border-x border-b rounded-b-md">
                    <section id='resourcesSection' className='pb-3 space-y-2 max-h-[90%] overflow-y-auto' >
                        {users?.map((user) => (
                            <div key={user.id} className={`w-full flex justify-between ${user?.availability && 'bg-[#FEF9F6]'} `} >
                                <div className="flex gap-2">
                                    <span className="w-1 h-full" style={{ backgroundColor: user.theme }}></span>
                                    <img 
                                        src="https://media.istockphoto.com/id/1181396841/photo/trendy-african-man.jpg?s=612x612&w=0&k=20&c=89F1KJHsttzyiuaJ5M0Rd4tLgiX7ooYDoPw7oNYZ5UI="
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <h2 className="font-Inter-Regular text-sm text-[#3E3E3E]">{user.name}</h2>
                                        {user?.availability && 
                                            <h2 className="font-Inter-SemiBold text-sm text-[#D86713]">Available for {user?.availability}</h2>
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Dropdown
                                        value={selectedClerk} onChange={(e) => setSelectedClerk(e.value)} options={clerks} optionLabel="label" 
                                        placeholder="Select Clerk" className="w-32"
                                        dropdownIcon={ <GoTriangleDown color="#767676" size={20} className="rotate-0 transition ease-in-out duration-150" /> }
                                        collapseIcon ={<GoTriangleDown color="#767676" size={20} className="rotate-180 transition ease-in-out duration-150" /> }
                                    />
                                    <span
                                        onClick={handleCommentClick}
                                        className="relative w-8 h-8 hover:bg-[#D9E3EC] FlexCenter rounded-full transition ease-in-out duration-200 cursor-pointer"
                                    >
                                        <div>
                                            <BiSolidCommentAdd size={20} color="#00457C" />
                                            <OverlayPanel ref={op} onHide={handleOverlayClose} closeOnEscape dismissable={false} align={'bottom'} >
                                                <div 
                                                    className='relative'
                                                    onClick={(e) => e.stopPropagation()} 
                                                >
                                                    <IoTriangle className="absolute mb-5 -top-2 right-[-12px]" size={20} color='#00457C' />
                                                    <div className='w-[30vw] pt-[10px] relative translate-x-16'>
                                                        <AddComment handleCommentClick = {handleCommentClick} />
                                                    </div>
                                                </div>
                                            </OverlayPanel>
                                        </div>
                                    </span>
                                    <RxCross2 size={20} color="#00457C" cursor={"not-allowed"} />
                                    <input
                                        type="number"
                                        className="bg-transparent border-b border-[#D5D5D5] py-2 w-8 flex items-center justify-end
                                        font-Inter-Medium text-sm text-[#3E3E3E] text-right outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </section>
                    <div className="w-full py-3 px-2 bg-[#F1F1F1] flex items-center justify-end border-t border-[#D5D5D5]">
                        <h3 className="font-Inter-Medium text-sm text-[#3E3E3E]">
                            Total Tasks Remaining
                            <span className="ml-2">{tasks || 0 }</span>
                        </h3>  
                    </div>
                </main>
            </>
        : <div className="h-[70vh] 2xl:h-[30rem] w-full FlexCenter border-x border-b border-[#E2E2E2] rounded-b-md">
            <div className="lg:max-w-[60%] 2xl:max-w-[40%] FlexCenter flex-col">
                <img src={clarify} alt="clarify" className="pointer-events-none" />
                <h3 className="font-Inter-Regular text-center text-sm text-[#686868]">Please complete the form to proceed and click Allocate Resources button.</h3>
            </div>
        </div>
        }

    </>
  )
}

export default Resources