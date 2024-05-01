import React, {useEffect, useState} from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import BasicTable from '../components/SingleTickets/SingleTicket'
import TicketForm from '../components/SingleTickets/SingleTicket'
import SingleTicket from '../components/SingleTickets/SingleTicket'
import CommentList from '../components/CommentList/CommentList'
import CommentInput from '../components/CommentForm/CommentInput'
import {useLocation} from "react-router-dom";

const TicketViewTemp = () => {
    const location = useLocation();
    const ticketId = location.state?.ticket_id;
    const [ticketDetail, setTicketDetail] = useState({})
    const getTicket = async() => {
        try {
            const url = process.env.REACT_APP_API_URL + '/api/ticket/' + ticketId
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            });
            response.json().then((data) => {
                setTicketDetail(data)
            })
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        getTicket()
    }, []);
    return (
        <div className='App'>
            <div className='AppGlass'>
                <Sidebar/>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    { ticketDetail?.creator && <SingleTicket ticketDetail={ticketDetail}/>}
                    <h3>Comments</h3>
                    <CommentInput/>

                    {ticketDetail?.comments && <CommentList CommentData = {ticketDetail.comments}/>}
                </div>
            </div>
        </div>
    )
}

export default TicketViewTemp
