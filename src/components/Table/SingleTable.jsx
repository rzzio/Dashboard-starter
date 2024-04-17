import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './Table.css';
import { TicketLists } from '../../Data/Data';
import { useNavigate } from 'react-router-dom';
import { makePriorityStyles, makeStyles } from '../SingleTickets/TicketStyles'; // Adjust the import path as necessary

export default function BasicTable() {
  const navigate = useNavigate(); // Hook for navigation

  const handleViewClick = (event) => {
    event.stopPropagation(); // Prevents the row click event from firing
    navigate('../tempticket'); // Navigate directly to the ticket view page
  };

  const handleRowClick = (row) => {
    console.log('Row clicked', row); // Placeholder action, customize as needed
  };

  return (
    <div>
      <h3>All Tickets</h3>
      <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Priority</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Assignee</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TicketLists.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleRowClick(row)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.createdat}</TableCell>
                <TableCell align="left">{row.useremail}</TableCell>
                <TableCell align="left">
                  <span className="priority" style={makePriorityStyles(row.priority)}>{row.priority}</span>
                </TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyles(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left">{row.admin}</TableCell>
                <TableCell align="left">
                  <Button 
                    variant="contained" 
                    style={{ background: '#007FFF', color: 'white', padding: '6px 12px', borderRadius: '4px', boxShadow: '0px 2px 5px rgba(0, 123, 255, 0.5)' }}
                    onMouseOver={(event) => event.target.style.background = '#0059B2'}
                    onMouseOut={(event) => event.target.style.background = '#007FFF'}
                    onClick={(event) => handleViewClick(event)} // Updated to use the modified handleViewClick
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
