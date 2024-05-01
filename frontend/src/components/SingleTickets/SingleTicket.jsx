import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makePriorityStyles, makeStyles } from './TicketStyles';
import AuthConsumer from "../../context/authContext"; // Import styling functions

const TicketDetails = ({ ticketDetail }) => {
  const [ticketStatus, setTicketStatus] = useState(ticketDetail.status);
  const [selectedAdmins, setSelectedAdmins] = useState(ticketDetail?.assigned_to[0]?.user.id || null);
  const [AdminList, setAdminList] = useState([])
  const isTechnician = sessionStorage.getItem('isTechnician') === "true"
  const isSuperAdmin = sessionStorage.getItem('isSuperAdmin') === "true"

  // const {isTechnician, isSuperAdmin} = AuthConsumer();


  const getAdmins = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/users?is_technician=true'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
      });
      response.json().then((data) => {
        setAdminList(data)
      })
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getAdmins();
  }, []);


  const handleStatusChange = async (newStatus) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/tickets'
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id: ticketDetail.id, col: "status", value: newStatus }),
      });

      if (response.ok) {
        console.log("status changed")
      } else {
        console.log("status changed")
      }
    } catch (error) {
      console.log(error)
    }

    setTicketStatus(newStatus);
  };

  const handleAdminChange = async (newAdminId) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/ticket/' + ticketDetail.id
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ assigned_to: [newAdminId] }),
      });

      if (response.ok) {
        console.log("status changed")
      } else {
        console.log("status changed")
      }
    } catch (error) {
      console.log(error)
    }
    setSelectedAdmins(newAdminId)
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: '5px', position: 'relative', top: '12px' }}>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id={`status-label`}>Ticket Status</InputLabel>
            {(isTechnician || isSuperAdmin) ? <Select
              labelId={`status-label`}
              id={`status-select}`}
              value={ticketStatus}
              label="Ticket Status"
              onChange={(e) => handleStatusChange(e.target.value)}
              size="small"
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Unassigned">Unassigned</MenuItem>
            </Select> : <div>{ticketStatus}</div>}
          </FormControl>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id={`admin-label`}>Assignee</InputLabel>
            {(isSuperAdmin && AdminList.length > 0) ?
              <Select
                labelId={`admin-label`}
                id={`admin-select`}
                value={selectedAdmins}
                label="Assignee"
                onChange={(e) => handleAdminChange(e.target.value)}
                size="small"
              >
                {AdminList.map((admin) => (
                  <MenuItem key={admin.id} value={admin.id}>{admin.email}</MenuItem>
                ))}
              </Select> : <div>{selectedAdmins || 'unassigned'}</div>}
          </FormControl>
        </Box>
        <div>
          <h1>{ticketDetail.title}</h1>
          <p>Created At: {ticketDetail.created_at}</p>
          <p>User Email: {ticketDetail.creator.email}</p>
          <p>
            Priority: <span style={makePriorityStyles(ticketDetail.priority)}>{ticketDetail.priority}</span>
          </p>
          <p>
            Status: <span style={makeStyles(ticketStatus)}>{ticketStatus}</span>
          </p>
          <p>Admin: {ticketDetail?.assigned_to ? ticketDetail?.assigned_to[0]?.user.email : '-'}</p>
          <p>Description: {ticketDetail.description}</p>
          <div>
            <h3>Attachments:</h3>
            <div>
              {ticketDetail.attachments && ticketDetail.attachments.length > 0 ? (
                ticketDetail.attachments.map((data, idx) => (
                  <a key={idx} href={data.file_url} target="_blank" rel="noopener noreferrer"> {/* Added for security */}
                    <img src={data.file_url} alt={`Attachment ${idx + 1}`} />
                  </a>
                ))
              ) : <span>No Attachments</span>}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TicketDetails;
