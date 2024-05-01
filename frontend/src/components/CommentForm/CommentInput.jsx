import React, {useState} from 'react';
import {Box, TextField, Button, IconButton, Typography, Snackbar, Alert} from '@mui/material';
import {useLocation} from "react-router-dom";

const CommentInput = () => {
    const location = useLocation();
    const ticketId = location.state?.ticket_id;
    const [comment, setComment] = useState('');
    const [file, setFile] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);  // State to manage Snackbar visibility

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const postAttachment = async (params) => {
        const formData = new FormData()
        formData.append('comment_id', params.id);
        formData.append('file', params.attachment);
        console.log(formData)
        try {
            const url = process.env.REACT_APP_API_URL + '/api/upload'
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: "include",
            });

            if (response.ok) {
                response.json().then( (data) => {
                    console.log(data)
                })
            } else {
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async() => {
        const params = {
            ticket_id: ticketId,
            description: comment
        }
        try {
            const url = process.env.REACT_APP_API_URL + '/api/comment'
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
                    await postAttachment({id: data.id, attachment: file})
                })
            } else {
            }
        } catch (error) {
            console.log(error)
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
                sx={{flexGrow: 1}}
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
                <Typography variant="caption" sx={{color: 'grey.600'}}>
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
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    Comment posted successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CommentInput;
