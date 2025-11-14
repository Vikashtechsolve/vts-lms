
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Routes() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>

    </>
  )
}

export default Routes
