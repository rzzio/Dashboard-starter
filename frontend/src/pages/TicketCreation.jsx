import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Box,
  Paper,
  FormGroup,
  Snackbar,
  Alert
} from '@mui/material';

const TicketCreation = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate()


  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { title, priority, description, attachment }
    postTicket(params).then(() => {
      console.log('hello')
    }
    )
    setOpenSnackbar(true);  // Trigger the Snackbar on form submission
  };

  const postTicket = async (params) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/ticket'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        credentials: "include",
      });

      if (response.ok) {
        response.json().then(async (data) => {
          await postAttachment({ id: data.id, attachment: attachment })
        })
      }
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  };
  const postAttachment = async (params) => {
    const formData = new FormData()
    formData.append('ticket_id', params.id);
    formData.append('file', params.attachment);
    console.log(formData)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/upload'
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        credentials: "include",
      });
    } catch (error) {
      console.log(error)
    }
  }

  const handleAttachmentChange = (event) => {
    setAttachment(event.target.files[0]);  // Handle file input change
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return;  // Prevents snackbar from closing when clicking outside
    }
    setOpenSnackbar(false);  // Close the Snackbar
  };

  return (
    <div className='App'>
      <div className='AppGlass'>
        <Sidebar />
        <Box component={Paper} elevation={3} sx={{
          flexGrow: 1,
          marginLeft: 3,
          padding: '40px',
          overflow: 'hidden',
          maxWidth: '800px',
          maxHeight: '550px',
          marginTop: '30px'
        }}>
          <Typography variant="h5" gutterBottom>
            Create New Ticket
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <TextField
                label="Title of the ticket"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <p variant='otulined'>Attachment</p>
                <InputLabel htmlFor="attachment"></InputLabel>
                <Input
                  id="attachment"
                  type="file"
                  onChange={handleAttachmentChange}
                />
              </FormControl>
              <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Submit Ticket
              </Button>
            </FormGroup>
          </form>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              Ticket created successfully!
            </Alert>
          </Snackbar>
        </Box>
      </div>
    </div>
  );
}

export default TicketCreation;
