import React, {useEffect, useState} from 'react';
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
import { makePriorityStyles, makeStyles } from '../SingleTickets/TicketStyles';
import AuthConsumer from "../../context/authContext"; // Adjust the import path as necessary


export default function BasicTable() {
  const navigate = useNavigate();
  const [TicketLists, setTicketList] = useState([])
  const isTechnician = sessionStorage.getItem('isTechnician') === "true"
  const isSuperAdmin = sessionStorage.getItem('isSuperAdmin') === "true"

  const handleViewClick = (event, row) => {
    event.stopPropagation();
    navigate('../tempticket', { state: { ticket_id: row.id } });  };

  const handleDeleteClick = async(event, ticket_id) => {
    event.stopPropagation(); // Prevents the row click event from firing
    try{
      const url = process.env.REACT_APP_API_URL + '/api/ticket/delete/' + ticket_id
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
      });
      if (response.ok) {
        setTicketList((prevState) => prevState.filter((row) => row.id !== ticket_id));
      } else {
        console.error('Failed to delete ticket:', response.status);
      }
    } catch (e) {
      console.error(e)
    }
  };

  const handleRowClick = (row) => {
    console.log('Row clicked', row); // Placeholder action, customize as needed
  };

  const getTickets = async() => {
    try{
      const url = process.env.REACT_APP_API_URL + '/api/tickets'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
      });
      response.json().then((data) =>{
        setTicketList(data)
      })
    } catch (e) {
      console.error(e)
    }
  }
  const formatTime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  useEffect(() => {
    getTickets();
  }, []);
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
              <TableCell align="left">Assigned To</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TicketLists.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleRowClick(row)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">{row?.creator?.first_name + ' ' + row?.creator?.last_name}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{formatTime(row.created_at)}</TableCell>
                <TableCell align="left">{row.creator.email}</TableCell>
                <TableCell align="left">
                  <span className="priority" style={makePriorityStyles(row.priority)}>{row.priority}</span>
                </TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyles(row.status)}>{row.status}</span>
                </TableCell>
                <TableCell align="left">{row?.assigned_to[0]?.user?.email} </TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={(event) => handleViewClick(event, row)}
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {isSuperAdmin &&
                  <IconButton
                    color="error"
                    onClick={(event) => handleDeleteClick(event, row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
