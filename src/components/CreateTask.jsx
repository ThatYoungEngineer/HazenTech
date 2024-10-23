import { useState } from "react"

import { GoTriangleDown } from "react-icons/go"
import { FaSave } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { LuCalendarDays } from "react-icons/lu"
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'

import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'

import Resources from "./Resources"
import BreadCrumb from "./BreadCrumb"

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


const CreateTask = () => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const [selectedPriority, setSelectedPriority] = useState(null)
    const [date, setDate] = useState(null)
    const [number, setNumber] = useState("")
    const [allocateResources, setAllocateResources] = useState(false)

    console.log('number: ', number)

  return (
    <>
        <section className='p-5 h-full w-full'>
            <div className='w-full flex items-center justify-between'>
                <h2 className='font-Inter-Regular font-light text-xl text-primary'>Create Task</h2>
                <BreadCrumb route = "Create Task" />
            </div>
            <section className="mt-5 w-full lg:min-h-screen 2xl:min-h-fit h-fit 2xl:h-[40rem] bg-white header-shadow rounded-md p-5 flex">
                <div className="flex-1 flex flex-col gap-3">
                    <div className="w-full flex items-center gap-2">
                        <label htmlFor="task_type" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                            Task Type
                        </label>
                        <Dropdown
                            value={selectedTask}
                            onChange={(e) => setSelectedTask(e.value)}
                            options={taskType}
                            optionLabel="label" 
                            highlightOnSelect={true}
                            placeholder="Select Task Type"
                            className="w-[70%] 2xl:w-[80%] font-Inter-Medium text-sm " 
                            dropdownIcon={ <GoTriangleDown color="#767676" size={20} className="rotate-0 transition ease-in-out duration-150" /> }
                            collapseIcon ={<GoTriangleDown color="#767676" size={20} className="rotate-180 transition ease-in-out duration-150" /> }
                        />
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <label htmlFor="project" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                            Projects
                        </label>
                        <Dropdown
                            value={selectedProject} onChange={(e) => setSelectedProject(e.value)} options={projects} optionLabel="label" 
                            placeholder="Select Project" className="w-[70%] 2xl:w-[80%] font-Inter-Medium text-sm"
                            dropdownIcon={ <GoTriangleDown color="#767676" size={20} className="rotate-0 transition ease-in-out duration-150" /> }
                            collapseIcon ={<GoTriangleDown color="#767676" size={20} className="rotate-180 transition ease-in-out duration-150" /> }
                        />
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <label htmlFor="priority" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                            Priority
                        </label>
                        <Dropdown
                            value={selectedPriority} onChange={(e) => setSelectedPriority(e.value)} options={priorities} optionLabel="label" 
                            placeholder="Select Priority" className="w-[70%] 2xl:w-[80%] font-Inter-Medium text-sm"
                            dropdownIcon={ <GoTriangleDown color="#767676" size={20} className="rotate-0 transition ease-in-out duration-150" /> }
                            collapseIcon ={<GoTriangleDown color="#767676" size={20} className="rotate-180 transition ease-in-out duration-150" /> }
                        />
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <label htmlFor="due-date" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                            Due Date
                        </label>
                        <Calendar 
                            placeholder="Select Due Date" dateFormat="dd-mm-yy" value={date} icon={<LuCalendarDays color="#767676" size={20} /> }
                            onChange={(e) => setDate(e.value)} showIcon className="w-[70%] 2xl:w-[80%] font-Inter-Medium text-sm cursor-pointer"
                        />
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <label htmlFor="integer-only" className="w-28 text-right font-Inter-Regular text-sm text-[#3E3E3E">
                            Number of Tasks
                        </label>
                        <input 
                            type="text" placeholder="Number of tasks" value={number} onChange={(e) => setNumber(e.target.value)} 
                            className="w-40 p-2 border-[2px] border-[#E1E1E1] border-opacity-50 rounded-[3px] 
                            text-2xl text-[#151529] font-Inter-Regular placeholder:text-sm placeholder:text-[#848484]
                            focus:border-[#00457C] focus:border-opacity-100 outline-none
                            transition ease-in-out duration-150"
                        />
                    </div>
                    <div className="ml-[120px]">
                        <button
                            type="button"
                            // disabled = { selectedTask == null || selectedProject == null || selectedPriority == null || date == null || number == null }
                            onClick={()=>setAllocateResources(true)}
                            className="flex items-center gap-1 font-Inter-Regular text-sm text-[#00457C] disabled:cursor-not-allowed cursor-pointer "
                        >
                            <GroupAddOutlinedIcon className="h-5 w-5"/>
                            <h3> Allocate Resources </h3>
                        </button>
                        <div className="mt-5 flex items-center gap-3">
                            <button type="button" disabled className=" disabled:opacity-40 font-Inter-Regular text-sm rounded-md bg-[#00457C] flex items-center gap-2 py-2 px-3 text-white cursor-not-allowed">
                                <FaSave />
                                Save 
                            </button>
                            <button type="button" disabled className="font-Inter-Regular text-sm rounded-md text-[#00457C] border border-[#00457C] flex items-center gap-1 py-2 px-3 bg-transparent cursor-not-allowed">
                                <RxCross2 />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Resources 
                        allocateResources = { allocateResources } 
                        tasks = { number }
                    />
                </div>
            </section>
        </section>
    </>
  )
}

export default CreateTask