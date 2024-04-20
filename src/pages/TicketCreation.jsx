import React, { useState } from 'react';
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Log submission data, could be replaced by actual API call
    console.log({ title, priority, description, attachment });
    setOpenSnackbar(true);  // Trigger the Snackbar on form submission
  };

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
        <Sidebar/>
        <Box component={Paper} elevation={3} sx={{
          flexGrow: 1,
          marginLeft: 3,
          padding: '40px',
          overflow: 'hidden',
          maxWidth: '800px',
          maxHeight: '550px',
          marginTop:'30px'
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
