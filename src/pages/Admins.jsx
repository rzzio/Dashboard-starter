import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import AdminList from '../components/AdminList/AdminList'

const Admins = () => {
  return (
    <div className='App'>
        <div className='AppGlass'>
      <Sidebar />
   <h2>This page will include the list of admin and the actions to activate and deactivee
    the admins.
   </h2>
      </div>
    </div>
  )
}

export default Admins
