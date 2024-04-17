import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import BasicTable from '../components/SingleTickets/SingleTicket'
import TicketForm from '../components/SingleTickets/SingleTicket'
import SingleTicket from '../components/SingleTickets/SingleTicket'

const TicketViewTemp = () => {
  return (
    <div className='App'>
        <div className='AppGlass'>
      <Sidebar />
      <SingleTicket />
    
    
      </div>
    </div>


      
    
  )
}

export default TicketViewTemp
