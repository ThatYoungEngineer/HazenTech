import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-screen h-screen flex justify-between flex-col bg-black text-white'>
      <Header />
      <div className='w-full h-full FlexCenter'>
        <Link to='/dashboard' className='hover:underline'>
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Home