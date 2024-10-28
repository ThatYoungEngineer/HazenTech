import { useState } from "react"

import { FaSave } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import { LuClock4 } from "react-icons/lu"

import { Dropdown } from 'primereact/dropdown'

const OverlaySection = ({ section, handleCommentClick }) => {
    const [selectedTime, setSelectedTime] = useState('');

    const time = [
        { duration: '01: 00' },
        { duration: '01: 30' },
        { duration: '02: 00' },
        { duration: '02: 30' },
        { duration: '03: 00' },
        { duration: '03: 30' },
        { duration: '04: 00' },
        { duration: '04: 30' },
        { duration: '05: 00' },
        { duration: '05: 30' },
        { duration: '06: 00' },
        { duration: '06: 30' }
    ]

    return (
    <section className='relative w-full rounded-xl bg-white z-50' style={{ boxShadow: '0 .5rem 1rem 0 rgba(0, 0, 0, .25)'}} >
        <span className='w-full flex items-center justify-between border-b border-[#E7E8EA] p-3'>
            <h3 className='font-Inter-Medium text-xl text-[#535353]'>
                {section == "Comment" && "Add Comment" }
                {section == "Partial Availability" && "Partial Availability" }
            </h3>
            <IoMdClose color='#D9D9D9' size={25} onClick={handleCommentClick} cursor={'pointer'} />
        </span>
        <section className="p-5">
            {section == "Partial Availability" &&
                <h2 className="font-Inter-Regular text-base text-[#06152B]">Availability in hours </h2>
            }
            {section == "Comment" && 
                <textarea rows={3} className="w-full outline-none resize-none placeholder:font-Inter-Regular text-sm text-[#848484] p-2 border border-[#D5D5D5] focus:border-primary rounded-md" placeholder="Write Comment Here" />
            }
            {section == "Partial Availability" &&
                <div className="relative timePanel">
                    <Dropdown 
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.value)}
                        options={time} optionLabel="duration" 
                        placeholder="Select Time" className="w-full md:w-14rem" 
                        scrollHeight = "22rem"
                        panelClassName="timePanel"
                    />
                    <div className="bg-secondary p-[9px] rounded-tr-sm rounded-br-sm absolute right-0 top-0">
                        <LuClock4 color="white" size={20} />
                    </div>
                </div>
            }
        </section>
        <section className="p-3 bg-[#F1F2F4] rounded-b-xl">
            <div className="flex items-center justify-end gap-3">
                <button type="button" className="font-Inter-Regular disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md bg-[#00457C] flex items-center gap-2 py-2 px-3 text-white">
                    <FaSave />
                    Save
                </button>
                <button 
                    type="button" 
                    className="font-Inter-Regular disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md text-[#00457C] border border-[#00457C] flex items-center gap-1 py-2 px-3 bg-transparent"
                    onClick={handleCommentClick}
                >
                    <RxCross2 />
                    Close
                </button>
            </div>
        </section>
    </section>
  )
}

export default OverlaySection