import React from 'react'
// import './Ticket.css'
import Sidebar from '../components/sidebar/Sidebar'
import AdminList from '../components/AdminList/AdminList'
import { TableChart } from '@material-ui/icons'
import Table from '../components/Table/Table'
import SingleBasicTable from '../components/Table/SingleTable'
 

const Ticket = () => {
  return (
    <div className='App'>
        <div className="AppGlass">
        <Sidebar/>
        <SingleBasicTable />

    
     
        
       
  
    </div>
    </div>
  )
}

export default Ticket
