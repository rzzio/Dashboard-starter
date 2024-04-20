import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography, Snackbar, Alert } from '@mui/material';

const CommentInput = () => {
    const [comment, setComment] = useState('');
    const [file, setFile] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);  // State to manage Snackbar visibility

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = () => {
        console.log('Comment:', comment);
        if (file) {
            console.log('File name:', file.name);
        }
        // Reset fields after submit
        setComment('');
        setFile(null);
        setOpenSnackbar(true);  // Open the Snackbar upon submission
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;  // Prevents closing the snackbar when clicking outside
        }
        setOpenSnackbar(false);  // Close the Snackbar
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginTop: 3,
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#fff'
        }}>
            <TextField
                fullWidth
                label="Write a comment..."
                variant="outlined"
                value={comment}
                onChange={handleCommentChange}
                multiline
                rows={3}  // Increased rows for the comment input
                sx={{ flexGrow: 1 }}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            color="primary"
                            component="label"
                            aria-label="attach file"
                        >
                            <span>📎</span> {/* Using Emoji as an icon */}
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                        </IconButton>
                    )
                }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Comment
            </Button>
            {file && (
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                    {file.name}
                </Typography>
            )}
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
                    Comment posted successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CommentInput;
