import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css'
import { TicketLists } from '../../Data/Data';

// function createData(user, title, createdat, email, priority,status,assignee) {
//   return { user, title, createdat, email, priority,status,assignee };
// }

// const rows = [
//   createData(' John Doe','SSL certificate','2024-01-01','supporter@gmail.com', 'High', 'Completed',"Support Member 1"),
//   createData('John Doe', 'SSL Certificate', '2024-01-01', 'john.doe@example.com', 'High', 'Completed',"Support Member 2"),
//   createData('Jane Smith', 'Web Hosting', '2024-02-15', 'jane.smith@example.com', 'Medium', 'In Progress',"Support Member 2"),
//   createData('Emily Johnson', 'Domain Registration', '2024-03-22', 'emily.johnson@example.com', 'Low', 'Pending',"Support Member 1"),
//   createData('Michael Brown', 'Email Hosting', '2024-04-30', 'michael.brown@example.com', 'Critical', 'Delayed',"Support Member 3"),
// ];

// const makeStyles=(status)=>{
//     if(status === 'Completed')
//     {
//       return {
//         background: 'rgb(145 254 159 / 47%)',
//         color: 'green',
//       }
//     }
//     else if(status === 'Pending')
//     {
//       return{
//         background: '#ffadad8f',
//         color: 'red',
//       }
//     }
//     else if(status==='In Progress'){
//       return{
//         background: '#59bfff',
//         color: 'white',
//       }

//     }
//     else return{
//         background: '#59bfff',
//         color: 'grey',
//     }
//   }

const makePriorityStyles = (priority) => {
    const priorityStyles = {
      'High': {
        background: '#ff6347', // Tomato
        color: 'white',
      },
      'Medium': {
        background: '#ffd700', // Gold
        color: 'black',
      },
      'Low': {
        background: '#90ee90', // LightGreen
        color: 'darkgreen',
      },
      'Critical': {
        background: '#dc143c', // Crimson
        color: 'white',
      }
    };
  
    // Fallback style for unspecified priorities
    const defaultStyle = {
      background: '#d3d3d3', // LightGray
      color: 'black',
    };
  
    return priorityStyles[priority] || defaultStyle;
  };

  
  
const makeStyles = (status) => {
    const statusStyles = {
      'Completed': {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      },
      'Pending': {
        background: '#ffadad8f',
        color: 'red',
      },
      'In Progress': {
        background: '#59bfff',
        color: 'white',
      }
    };
  
    // Fallback style for unspecified statuses
    const defaultStyle = {
      background: '#8A9A5B',
      color: 'white',
    };
  
    return statusStyles[status] || defaultStyle;
  };
  
 
export default function BasicTable() {
  return (
    <div>
    
        
    <TableContainer component={Paper}
     style={{boxShadow: '0px 13px 20px 0px #80808029'}}
    
    
     >
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
          </TableRow>
        </TableHead>
        <TableBody>
          {TicketLists.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.createdat}</TableCell>
              <TableCell align="left">{row.useremail}</TableCell>
              <TableCell align="left">
                
              <span className="priority" style={makePriorityStyles(row.priority)}>
        
                {row.priority}
                
                
                
                </span>
                </TableCell>


              <TableCell align="left">
                
                <span className="status" style={makeStyles(row.status)}>
                    {row.status}
                </span>
                
                </TableCell>


              <TableCell align="left">{row.admin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
