import { useState } from "react"

import { IoHome } from "react-icons/io5"
import { PiLineVertical } from "react-icons/pi"
import { FaSave } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { IoMdAddCircle } from "react-icons/io"
import { BiSolidCommentAdd } from "react-icons/bi"
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import { Link } from "react-router-dom"

import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'

const taskType = [
    { label: 'Outlook', value: 'Outlook' },
    { label: 'Numbers', value: 'Numbers' },
    { label: 'DL Response', value: 'DL Response' },
]

const priorities = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
]

const projects = [
    { label: 'Miami Naples', value: 'Miami Naples' },
    { label: 'Project A', value: 'Project A' },
    { label: 'Project B', value: 'Project B' },
    { label: 'Project C', value: 'Project C' },
    { label: 'Project D', value: 'Project D' }
]

const inputs = [
    { id: 1, label: 'Select Task Type' },
    { id: 2, label: 'Projects' },
    { id: 3, label: 'Priority' },
    { id: 4, label: 'Due Date' },
    { id: 5, label: 'Number of Tasks' }
]

const users = [
    { id: 1, name: "John Berg", theme: '#3DCE1E', availability: null },
    { id: 1, name: "Lara Croft", theme: '#1876D2', availability: null },
    { id: 1, name: "Heisenberg", theme: '#3DCE1E', availability: null },
    { id: 1, name: "Mr. White", theme: '#3DCE1E', availability: '07:00 hours' },
    { id: 1, name: "John Wick", theme: '#E9C50C', availability: null },
    { id: 1, name: "Ali Ahmed", theme: '#3DCE1E', availability: null },
    { id: 1, name: "Lars Alex", theme: '#1876D2', availability: null },
]

const clerks = [
    { id: 1, label: "Clerk 01" },
    { id: 2, label: "Clerk 02" },
    { id: 3, label: "Clerk 03" }
]

const CreateTask = () => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedPriority, setSelectedPriority] = useState(null)
    const [date, setDate] = useState(null)
    const [number, setNumber] = useState(null);
    const [selectedClerk, setSelectedClerk] = useState(null)


  return (
    <section className='p-5 h-full w-full'>
        <div className='w-full flex items-center justify-between'>
            <h2 className='font-Inter-Regular font-light text-xl text-primary'>Create Task</h2>
            <div className="flex items-center">
                <Link to='/'>
                    <IoHome color="#00457C" size={25} />
                </Link>
                <PiLineVertical color="#00457C" size={25} className="rotate-12" />
                <h2 className="text-[#00457C] font-Inter-Regular text-sm">Create Task</h2> 
            </div>
        </div>
        <section className="mt-5 w-full min-h-fit bg-white header-shadow rounded-md p-5 flex">
            <div className="flex-1 flex flex-col gap-3">
                <div className="w-full flex items-center gap-2">
                    <label htmlFor="task_type" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                        Task Type
                    </label>
                    <Dropdown
                        value={selectedTask} onChange={(e) => setSelectedTask(e.value)} options={taskType} optionLabel="label" 
                        placeholder="Select Task Type" className="w-[70%] 2xl:w-[80%] "
                    />
                </div>
                <div className="w-full flex items-center gap-2">
                    <label htmlFor="project" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                        Projects
                    </label>
                    <Dropdown
                        value={selectedProject} onChange={(e) => setSelectedProject(e.value)} options={projects} optionLabel="label" 
                        placeholder="Select Project" className="w-[70%] 2xl:w-[80%] focus:border-[#00457C]"
                    />
                </div>
                <div className="w-full flex items-center gap-2">
                    <label htmlFor="priority" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                        Priority
                    </label>
                    <Dropdown
                        value={selectedPriority} onChange={(e) => setSelectedPriority(e.value)} options={priorities} optionLabel="label" 
                        placeholder="Select Priority" className="w-[70%] 2xl:w-[80%]"
                    />
                </div>
                <div className="w-full flex items-center gap-2">
                    <label htmlFor="due-date" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                        Due Date
                    </label>
                    <Calendar placeholder="Select Due Date" value={date} onChange={(e) => setDate(e.value)} showIcon className="w-[70%] 2xl:w-[80%]"  />
                </div>
                <div className="w-full flex items-center gap-2">
                    <label htmlFor="integer-only" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                        Number of Tasks
                    </label>
                    <InputNumber placeholder="Number of Tasks" inputId="integer-only" value={number} onValueChange={(e) => setValue1(e.value)}
                        className="font-Inter-Regular text-2xl text-[#151529]"
                    />
                </div>
                <div className="ml-[120px]">
                    <span className="flex items-center gap-1 font-Inter-Regular text-sm text-[#00457C] cursor-pointer">
                        <GroupAddOutlinedIcon className="h-5 w-5"/>
                        <h3> Allocate Resources </h3>
                    </span>
                    <div className="mt-5 flex items-center gap-3">
                        <button type="button" className="font-Inter-Regular text-sm rounded-md bg-[#00457C] flex items-center gap-2 py-2 px-3 text-white">
                            <FaSave />
                            Save
                        </button>
                        <button type="button" className="font-Inter-Regular text-sm rounded-md text-[#00457C] border border-[#00457C] flex items-center gap-1 py-2 px-3 bg-transparent">
                            <RxCross2 />
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
            <div className="flex-1">
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
                <section className="py-3 px-2 w-full flex flex-col gap-3">
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
                                <span className="w-8 h-8 hover:bg-[#D9E3EC] FlexCenter rounded-full transition ease-in-out duration-200 cursor-pointer">
                                    <BiSolidCommentAdd size={20} color="#00457C" />
                                </span>
                                <RxCross2 size={20} color="#00457C" cursor={"pointer"} />
                                <input
                                    type="number"
                                    className="bg-transparent border-b border-[#D5D5D5] py-2 w-10 flex items-center justify-end font-Inter-Regular text-sm text-[#3E3E3E] text-right outline-none"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="w-full py-3 px-2 bg-[#F1F1F1] flex items-center justify-end">
                        <h3 className="font-Inter-Regular font-medium text-sm text-[#3E3E3E]">
                            Total Tasks Remaining
                            <span className="ml-2">0</span>
                        </h3>  
                    </div>
                </section>
            </div>
        </section>
    </section>
  )
}

export default CreateTask