import { Dropdown } from 'primereact/dropdown'
import { useState, useRef } from 'react'
import { BiSolidCommentAdd } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import AddComment from './AddComment'
import { IoTriangle } from "react-icons/io5"

import { OverlayPanel } from 'primereact/overlaypanel'

const users = [
    { id: 9, name: "John Berg", theme: '#3DCE1E', availability: null },
    { id: 2, name: "Lara Croft", theme: '#1876D2', availability: null },
    { id: 3, name: "Heisenberg", theme: '#3DCE1E', availability: null },
    { id: 4, name: "Mr. White", theme: '#3DCE1E', availability: '07:00 hours' },
    { id: 5, name: "John Wick", theme: '#E9C50C', availability: null },
    { id: 6, name: "Ali Ahmed", theme: '#3DCE1E', availability: null },
    { id: 7, name: "Lars Alex", theme: '#1876D2', availability: null },
]

const clerks = [
    { id: 1, label: "Clerk 01" },
    { id: 2, label: "Clerk 02" },
    { id: 3, label: "Clerk 03" }
]

const Resources = () => {
    const [selectedClerk, setSelectedClerk] = useState(null)
    const [openComment, setOpenComment] = useState(null)
    const op = useRef(null)

    const handleToggleComment = (id) => {
        console.log('cicked')
        if (openComment === id) setOpenComment(null)
        else setOpenComment(id)
    }

  return (
    <>
        <div className="w-full flex items-center justify-between bg-[#E6EDF2] p-4 border rounded-t-md border-[#E2E2E2]">
            <h2 className="font-Inter-Regular text-sm text-[#3E3E3E]"> Available Resources </h2>
            <span className="cursor-pointer">
                <IoMdAddCircle  color="#00457C" size={25} />
            </span>
        </div>
        <div className="w-full flex items-center justify-between bg-[#F7F7F7] p-3 border-b border-x border-[#E2E2E2]">
            <h2 className="font-Inter-Regular text-sm text-[#3E3E3E]"> Resources </h2>
            <h2 className="font-Inter-Regular text-sm text-[#3E3E3E]"> Task Division </h2>
        </div>
        <section className="py-3 px-2 max-h-[17rem] 2xl:max-h-[28rem] overflow-y-auto w-full flex flex-col gap-3 border-[#E2E2E2] border-x border-b rounded-md">
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
                        />
                        <span
                            onClick={(e) => op.current.toggle(e)}
                            className="relative w-8 h-8 hover:bg-[#D9E3EC] FlexCenter rounded-full transition ease-in-out duration-200 cursor-pointer"
                        >
                            <div>
                                <BiSolidCommentAdd size={20} color="#00457C" />
                                <OverlayPanel ref={op} className="bg-red-500">
                                    <div 
                                        className='relative'
                                        onClick={(e) => e.stopPropagation()} 
                                    >
                                        <IoTriangle className="absolute -top-2 right-[6px]" size={20} color='#00457C' />
                                        <div className='w-[25rem] bg-white shadow-lg p-4'>
                                            <AddComment />
                                        </div>
                                    </div>
                                </OverlayPanel>
                            </div>
                        </span>
                        <RxCross2 size={20} color="#00457C" cursor={"not-allowed"} />
                        <input
                            type="number"
                            className="bg-transparent border-b border-[#D5D5D5] py-2 w-10 flex items-center justify-end font-Inter-Regular text-sm text-[#3E3E3E] text-right outline-none"
                        />
                    </div>
                </div>
            ))}
            <div className="w-full py-3 px-2 bg-[#F1F1F1] flex items-center justify-end border-t border-[#D5D5D5]">
                <h3 className="font-Inter-Regular font-medium text-sm text-[#3E3E3E]">
                    Total Tasks Remaining
                    <span className="ml-2">0</span>
                </h3>  
            </div>
        </section>
    </>
  )
}

export default Resources