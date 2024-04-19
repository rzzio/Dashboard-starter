import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography } from '@mui/material';

const CommentInput = () => {
    const [comment, setComment] = useState('');
    const [file, setFile] = useState(null);

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
        // Here you would typically handle the submission to the backend
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginTop: 2,
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#fff'
        }}>
            <TextField
                fullWidth
                label="Write a comment..."
                variant="outlined"
                value={comment}
                onChange={handleCommentChange}
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
                sx={{ flexGrow: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Comment
            </Button>
            {file && (
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                    {file.name}
                </Typography>
            )}
        </Box>
    );
};

export default CommentInput;
