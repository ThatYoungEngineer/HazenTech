import { FaSave } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"

const AddComment = () => {
  return (
    <section className='w-full rounded-xl bg-white header-shadow'>
        <span className='w-full flex items-center justify-between border-b border-[#E7E8EA] p-3'>
            <h3 className='font-Inter-Medium text-lg text-[#535353]'>Add Comment</h3>
            <IoMdClose color='#D9D9D9' size={25} />
        </span>
        <section className="p-5">
            <textarea rows={5} className="w-full outline-none resize-none placeholder:font-Inter-Regular text-sm text-[#848484] p-2 border border-[#D5D5D5] focus:border-primary rounded-md" placeholder="Write Comment Here" />
        </section>
        <section className="p-3 bg-[#F1F2F4]">
            <div className="flex items-center justify-end gap-3">
                <button type="button" className="font-Inter-Regular disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md bg-[#00457C] flex items-center gap-2 py-2 px-3 text-white">
                    <FaSave />
                    Save
                </button>
                <button type="button" className="font-Inter-Regular disabled:opacity-50 disabled:cursor-not-allowed text-sm rounded-md text-[#00457C] border border-[#00457C] flex items-center gap-1 py-2 px-3 bg-transparent">
                    <RxCross2 />
                    Close
                </button>
            </div>
        </section>
    </section>
  )
}

export default AddComment