import BreadCrumb from "./BreadCrumb"
import SelectionTable from "./SelectionTable"

import { FaSave, FaUserCheck } from "react-icons/fa"
import { HiTrash } from "react-icons/hi"

import { InputSwitch } from "primereact/inputswitch"
import { useEffect, useState } from "react"
import { RxCross2 } from "react-icons/rx"

import { useSidebar } from '../context/sidebarContext'

const AbsentResources = () => {
    const { users, selectedUsers } = useSidebar();
    const [usersData, setUsersData] = useState(selectedUsers || []); // Initialize with an empty array if selectedUsers is undefined

    useEffect(() => {
        // Sync usersData with selectedUsers when selectedUsers changes
        setUsersData(selectedUsers || []);
    }, [selectedUsers]);

    const handleRemoveUser = (userId) => {
        setUsersData((prevUsers) => prevUsers.filter(user => user.id !== userId));
    }
      
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

  const date = new Date()

  const formattedDate = [
    String(date.getDate()).padStart(2, '0'),        
    String(date.getMonth() + 1).padStart(2, '0'),
    date.getFullYear()                              
  ].join('-')

  return (
    <section className='p-5 h-full w-full'>
        <div className='w-full flex items-center justify-between'>
            <h2 className='font-Inter-Regular font-light text-xl text-primary'>
                Absent/Partial Resources | <span>{formattedDate}</span>
            </h2>
            <BreadCrumb route = "Absent Resources"/>
        </div>
        <main className="mt-5 w-full min-h-fit bg-white header-shadow rounded-md p-5 flex" >
            <section className="flex-1 pr-5 border-r border-[#E7E8EA] flex flex-col gap-5"> 
                <h2 className="w-full text-primary font-Inter-Regular text-lg pb-1 border-b border-[#E8E8E8] ">Choose Resources for Absence Marking</h2>
                    <div className="w-full h-fit ">
                    <SelectionTable />
                </div>
            </section>
            <section className="flex-1 pl-5 flex flex-col gap-5">
                <h2 className="w-full flex items-center gap-2 text-primary font-Inter-Regular text-lg pb-1 border-b border-[#E8E8E8] ">
                    <FaUserCheck />
                    <span>
                        Absent/Partial Resources <span>({usersData?.length})</span> 
                    </span>
                </h2>
                <main className="w-full h-full flex flex-col justify-between">
                    <section className="w-full flex gap-3 flex-col h-full max-h-[279px] 2xl:max-h-[60vh] overflow-y-auto">
                        {usersData && usersData.length > 0 ? usersData.map((user) => (
                            <section key={user.id} className="py-2 px-3 w-full flex items-center justify-between border-2 border-[#00457C] rounded-md">
                                <div className="flex gap-2 items-center">
                                    <img 
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR34VNI2RCmMP7q-xSlNft7ya1cNF_HxOZ-xA&s"
                                        alt={`Profile picture of ${user.name}`} // More descriptive alt text
                                        className="w-10 h-10 object-cover rounded-full" 
                                    />
                                    <span className="flex flex-col justify-between h-full font-Inter-Medium text-sm text-primary">
                                        <h3>{user.name}</h3>
                                        <h3>{user.email}</h3>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-Inter-Regular text-sm text-black">Partially Available</h3>
                                    <div className="card flex justify-center">
                                        <InputSwitch 
                                            checked={checkedStates[user.id]} 
                                            onChange={() => handleToggle(user.id)} // Make sure handleToggle is defined
                                            aria-label={`Toggle availability for ${user.name}`} // Accessible label
                                        />
                                    </div>
                                    <HiTrash
                                        size={25} 
                                        color="#CB4B6C" 
                                        cursor={'pointer'} 
                                        onClick={() => handleRemoveUser(user.id)} // Make sure handleRemoveUser is defined
                                        title={`Remove ${user.name}`} // Descriptive title for accessibility
                                        aria-label={`Remove ${user.name}`} // Accessible label
                                    />
                                </div>
                            </section>
                        )) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <h3 className="font-Inter-Regular text-lg text-gray-500 italic">No resource available.</h3>
                            </div>
                        )}
                    </section>
                    {usersData?.length > 0 &&
                        <div className="mt-5 flex items-center gap-3">
                            <button type="button" disabled className="font-Inter-Regular disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md bg-[#00457C] flex items-center gap-2 py-2 px-3 text-white">
                                <FaSave />
                                Save
                            </button>
                            <button type="button" disabled className="font-Inter-Regular disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md text-[#00457C] border border-[#00457C] flex items-center gap-1 py-2 px-3 bg-transparent">
                                <RxCross2 />
                                Cancel
                            </button>
                        </div>
                    }
                </main>
            </section>
        </main>  
    </section>
  )
}

export default AbsentResources