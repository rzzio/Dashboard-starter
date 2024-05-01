import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {makePriorityStyles, makeStyles} from '../SingleTickets/TicketStyles'; // Adjust the import path as necessary
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';  // Import the eye icon
const UserList = () => {

    const [users, setUsers] = useState([])

    const navigate = useNavigate()
    const handleViewClick = (event, row) => {
        event.stopPropagation(); // Prevents the row click event from firing
        navigate('../tempticket'); // Navigate directly to the ticket view page
    };

    const handleDeleteClick = async (event, ticket_id) => {
        event.stopPropagation(); // Prevents the row click event from firing
        // try {
        //     const url = process.env.REACT_APP_API_URL + '/api/ticket/delete/' + ticket_id
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         credentials: "include",
        //     });
        //     if (response.ok) {
        //         setUsers((prevState) => prevState.filter((row) => row.id !== ticket_id));
        //     } else {
        //         console.error('Failed to delete ticket:', response.status);
        //     }
        // } catch (e) {
        //     console.error(e)
        // }
    };

    const handleRowClick = (row) => {
        console.log('Row clicked', row); // Placeholder action, customize as needed
    };
    const getUsers = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + '/api/users'
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            });
            response.json().then((data) => {
                setUsers(data)
            })
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        getUsers();
    }, []);


    return (
        <div>
            <TableContainer component={Paper} style={{boxShadow: '0px 13px 20px 0px #80808029'}}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => handleRowClick(row)}
                                style={{cursor: 'pointer'}}
                            >
                                <TableCell component="th" scope="row">{row.first_name}</TableCell>
                                <TableCell align="left">{row.last_name}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">
                                    {row.phone}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


export default UserList;
