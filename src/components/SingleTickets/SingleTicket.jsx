import React, { useState } from 'react';
import { SingleTicketDetail } from '../../Data/Data'; // Ensure the path is correct
import { AdminList } from '../../Data/Data'; // Import AdminList (adjust the path as necessary)
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makePriorityStyles, makeStyles } from './TicketStyles'; // Import styling functions

const TicketDetails = () => {
  const [ticketStatus, setTicketStatus] = useState(SingleTicketDetail.map(ticket => ticket.status));
  const [selectedAdmins, setSelectedAdmins] = useState(SingleTicketDetail.map(() => AdminList[0].email));

  const handleStatusChange = (index, newStatus) => {
    const updatedStatus = [...ticketStatus];
    updatedStatus[index] = newStatus;
    setTicketStatus(updatedStatus);
  };

  const handleAdminChange = (index, newEmail) => {
    const updatedAdmins = [...selectedAdmins];
    updatedAdmins[index] = newEmail;
    setSelectedAdmins(updatedAdmins);
  };

  return (
    <div>
      {SingleTicketDetail.map((ticket, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: '5px', position: 'relative', top: '12px' }}>
            <FormControl sx={{ width: 150 }}>
              <InputLabel id={`status-label-${index}`}>Ticket Status</InputLabel>
              <Select
                labelId={`status-label-${index}`}
                id={`status-select-${index}`}
                value={ticketStatus[index]}
                label="Ticket Status"
                onChange={(e) => handleStatusChange(index, e.target.value)}
                size="small"
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: 150 }}>
              <InputLabel id={`admin-label-${index}`}>Assignee</InputLabel>
              <Select
                labelId={`admin-label-${index}`}
                id={`admin-select-${index}`}
                value={selectedAdmins[index]}
                label="Assignee"
                onChange={(e) => handleAdminChange(index, e.target.value)}
                size="small"
              >
                {AdminList.map((admin) => (
                  <MenuItem key={admin.adminId} value={admin.email}>{admin.email}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div>
            <h1>{ticket.title}</h1>
            <p>Created At: {ticket.createdat}</p>
            <p>User Email: {ticket.useremail}</p>
            <p>
              Priority: <span style={makePriorityStyles(ticket.priority)}>{ticket.priority}</span>
            </p>
            <p>
              Status: <span style={makeStyles(ticketStatus[index])}>{ticketStatus[index]}</span>
            </p>
            <p>Admin: {selectedAdmins[index]}</p>
            <p>Description: {ticket.description}</p>
            <div>
  <h3>Attachments:</h3>
  <div>
    {ticket.attachment && ticket.attachment.length > 0 ? (
      ticket.attachment.map((url, idx) => (
        <a key={idx} href={url} target="_blank" rel="noopener noreferrer"> {/* Added for security */}
          <img src={url} alt={`Attachment ${idx + 1}`} />
        </a>
      ))
    ) : <span>No Attachments</span>}
  </div>
</div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketDetails;
