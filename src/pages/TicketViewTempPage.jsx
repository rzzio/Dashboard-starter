import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import BasicTable from '../components/SingleTickets/SingleTicket'
import TicketForm from '../components/SingleTickets/SingleTicket'
import SingleTicket from '../components/SingleTickets/SingleTicket'
import CommentList from '../components/CommentList/CommentList'

const TicketViewTemp = () => {
  return (
    <div className='App'>
        <div className='AppGlass'>
      <Sidebar />
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <SingleTicket />
      <CommentList />
  
      </div>
    
    
      </div>
    </div>


      
    
  )
}

export default TicketViewTemp
