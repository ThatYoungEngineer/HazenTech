import BreadCrumb from "./BreadCrumb"
import SelectionTable from "./SelectionTable"

import { GrSearch } from "react-icons/gr"
import { FaSave, FaUserCheck } from "react-icons/fa"
import { HiTrash } from "react-icons/hi"

import { InputSwitch } from "primereact/inputswitch"
import { useState } from "react"
import { RxCross2 } from "react-icons/rx"

const users = [
    {id: 1, name: "Aliza Sehar", email: "aliza@gmail.com"},
    {id: 2, name: "Umer Akhtar", email: "umer@gmail.com"},
    {id: 3, name: "Johnny Depp", email: "johnnydepp@gmail.com"},
]

const AbsentResources = () => {
    
    const initialCheckedState = users.reduce((acc, user) => {
        acc[user.id] = false; // or true if you want some to be checked by default
        return acc;
    }, {})

  const [checkedStates, setCheckedStates] = useState(initialCheckedState);

  const handleToggle = (userId) => {
    setCheckedStates((prev) => ({
      ...prev,
      [userId]: !prev[userId], // Toggle the specific userId
    }));
  }

  return (
    <section className='p-5 h-full w-full'>
        <div className='w-full flex items-center justify-between'>
            <h2 className='font-Inter-Regular font-light text-xl text-primary'>
                Absent/Partial Resources | <span>15-05-2024</span>
            </h2>
            <BreadCrumb route = "Absent Resources"/>
        </div>
      <main className="mt-5 w-full min-h-fit bg-white header-shadow rounded-md p-5 flex" >
        <section className="flex-1 pr-5 border-r border-[#E7E8EA] flex flex-col gap-5"> 
            <h2 className="w-full text-primary font-Inter-Regular text-lg pb-1 border-b border-[#E8E8E8] ">Choose Resources for Absence Marking</h2>
            <div className="relative">
                <input 
                    type="text" placeholder="Search"
                    className="w-full py-2 px-9 border-2 border-[##D9D9D9] outline-none focus:border-[#00457C] font-Roboto-Regular font-medium text-sm text-primary placeholder:text-[#545454] self-center placeholder:text-sm rounded-md" 
                />
                <GrSearch className="font-medium text-[#545454] absolute top-1/2 left-5 transform -translate-x-1/2 -translate-y-1/2" size={15} />
            </div>
            <div className="w-full h-fit bg-pink-300">
                <SelectionTable />
            </div>
        </section>
        <section className="flex-1 pl-5 flex flex-col gap-5">
            <h2 className="w-full flex items-center gap-2 text-primary font-Inter-Regular text-lg pb-1 border-b border-[#E8E8E8] ">
                <FaUserCheck />
                <span>
                    Absent/Partial Resources <span>(3)</span> 
                </span>
            </h2>
            <main className="w-full h-full flex flex-col justify-between">
                <section className="w-full flex gap-3 flex-col">
                    {users?.map((user) => (
                        <section key={user.id} className="p-3 w-full flex items-center justify-between border-2 border-[#00457C] rounded-md">
                            <div className="flex gap-2 items-center">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34VNI2RCmMP7q-xSlNft7ya1cNF_HxOZ-xA&s" alt="user image" className="w-10 h-10 object-cover rounded-full" />
                                <span className="flex flex-col justify-between h-full font-Inter-Regular text-sm text-primary">
                                    <h3> {user.name} </h3> 
                                    <h3> {user.email} </h3> 
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-Inter-Regular text-sm text-black">Partially Available</h3>
                                <div className="card flex justify-content-center">
                                    <InputSwitch 
                                        checked={checkedStates[user.id]} 
                                        onChange={() => handleToggle(user.id)} 
                                    />
                                </div>
                                <HiTrash size={25} color="#CB4B6C" />
                            </div>
                        </section>
                    ))}
                </section>
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
            </main>
        </section>
      </main>  
    </section>
  )
}

export default AbsentResources