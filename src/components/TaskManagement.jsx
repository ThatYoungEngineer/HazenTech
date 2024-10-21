import EnhancedTable from "./DataTable.jsx"
import { Link } from "react-router-dom"
import { IoMdAdd } from "react-icons/io"

const TaskManagement = () => {
  return (
    <section className='p-5 h-full w-full'>
      <div className='w-full flex items-center justify-between'>
        <h2 className='font-Inter-Regular font-light text-xl text-primary'>Task Management</h2>
        <Link to='/create-task'>
          <button type="button" className="flex gap-2 items-center py-3 px-4 rounded-md bg-[#00457C] hover:shadow-lg transition ease-in-out duration-200">
            <IoMdAdd color="#fff" size={20} />
            <h3 className="font-Inter-Regular text-sm text-white">Create Task</h3>
          </button>
        </Link>
      </div>
      <section className="mt-5 w-full min-h-fit bg-white header-shadow rounded-md p-5 ">
        <EnhancedTable />
      </section>
    </section>
  )
}

export default TaskManagement