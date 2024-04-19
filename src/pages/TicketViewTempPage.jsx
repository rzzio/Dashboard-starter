import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import BasicTable from '../components/SingleTickets/SingleTicket'
import TicketForm from '../components/SingleTickets/SingleTicket'
import SingleTicket from '../components/SingleTickets/SingleTicket'
import CommentList from '../components/CommentList/CommentList'
import CommentInput from '../components/CommentForm/CommentInput'

const TicketViewTemp = () => {
  return (
    <div className='App'>
        <div className='AppGlass'>
      <Sidebar />
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <SingleTicket />
      <h3>Comments</h3>
      <CommentInput />
     
      <CommentList />

    
  
      </div>
    
    
      </div>
    </div>


      
    
  )
}

export default TicketViewTemp
