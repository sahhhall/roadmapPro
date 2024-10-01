import Navbar from '@/components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default UserLayout