import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import UserList from '../components/UserComponent/UserList.jsx'
const Users = () => {
  return (
    <div>
       <div className='App'>
        <div className='AppGlass'>
      <Sidebar />
      <div>
        <h2>User Page</h2>
        <h3> this page will include the list of Users that are 
          in the system</h3>
          <UserList />
      </div>
      </div>
    </div>
    </div>
  )
}

export default Users
