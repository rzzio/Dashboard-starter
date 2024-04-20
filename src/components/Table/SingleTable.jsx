import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';  // Import the eye icon
import './Table.css';
import { TicketLists } from '../../Data/Data';
import { makePriorityStyles, makeStyles } from '../SingleTickets/TicketStyles'; // Adjust the import path as necessary


//TODO: fetching status and priority from API


export default function BasicTable() {
  const navigate = useNavigate();

  const handleViewClick = (event, row) => {
    event.stopPropagation(); // Prevents the row click event from firing
    navigate('../tempticket'); // Navigate directly to the ticket view page
  };

  const handleDeleteClick = (event, row) => {
    event.stopPropagation(); // Prevents the row click event from firing
    console.log('Delete action on:', row); // Placeholder for actual delete functionality
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
                <TableCell align="left">
                  <IconButton
                    onClick={(event) => handleViewClick(event, row)}
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={(event) => handleDeleteClick(event, row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
