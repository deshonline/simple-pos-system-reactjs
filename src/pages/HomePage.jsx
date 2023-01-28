import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

function HomePage() {
  return (
    <div className='hbody'>
      <MainLayout>
        <div className='bg-dark p-5 mt-4 rounded-3 bg-opacity-50'>
          <h1 className='welcome'>Welcome To DESH Simple POS System</h1>
          <div class="text-center mt-5">
            <Link to='/pos' className='btn btn-primary btn-lg btn-block align-items-center justify-content-center'><i class="fa-solid fa-hand-pointer"></i>   Click To Enter POS System</Link></div>
        </div>
      </MainLayout>
    </div>
  )
}

export default HomePage