import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

import { useState, useEffect } from 'react'
import { useSidebar } from '../context/sidebarContext'
import { useLocation } from 'react-router-dom'
import TaskManagement from '../components/TaskManagement'

const Dashboard = () => {
  const { openSidebar } = useSidebar()
  const location = useLocation()
  const [tab, setTab] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromURL = urlParams.get("tab")

    tabFromURL && setTab(tabFromURL)
  })


  return (
    <section className='w-screen h-screen overflow-hidden flex flex-col justify-between'>
      <Header />
      <section className='h-full w-full flex relative'>
        <aside
          className={`h-full w-[20vw] max-w-72 absolute z-50 bg-fuchsia-200 transition-all duration-300 ease-in-out`}
          style={{
            transform: openSidebar? 'translateX(0vw)' : 'translateX(-20vw)',
            transition: 'all 300ms ease-in-out',
            opacity: openSidebar ? 1 : 0,
            pointerEvents: openSidebar? 'auto' : 'none',
          }}
        >
          <Sidebar />
        </aside>
        <main className={`h-full w-full transition-all ease-in-out duration-300  ${openSidebar ? 'ml-[20vw]' : 'ml-0'} bg-[#EFF4F8] flex flex-col items-center justify-between`}>
          <section>
            {tab === 'task-management' && <TaskManagement />}
          </section>
          <Footer />
        </main>
      </section>
    </section>
  )
}

export default Dashboard