import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-screen h-[90vh] FlexCenter bg-black text-white'>
        <Link to='/dashboard' className='hover:underline'>
            Go to Dashboard
        </Link>
    </div>
  )
}

export default Home