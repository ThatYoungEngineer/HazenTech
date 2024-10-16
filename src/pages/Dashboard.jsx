import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <>
        <section className='w-screen h-[90vh] overflow-hidden flex'>
            <aside className='h-full max-w-[20vw]'>
              <Sidebar />
            </aside>
            <main className='h-full w-full bg-[#EFF4F8] flex flex-col items-center justify-between'>
              <section className='p-10'>
                <h1 className='font-semibold text-4xl'>Main Content</h1>
              </section>
              <Footer />
            </main>
        </section>
    </>
  )
}

export default Dashboard