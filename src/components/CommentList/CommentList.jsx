import React from 'react';
import { CommentData } from '../../Data/Data';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Box } from '@mui/material';

const CommentsViewer = () => {
    // Function to render individual comments in separate cards
    const renderComment = (comment, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
            <CardContent>
                <ListItem divider>
                    <ListItemText primary={`${comment.name} replies: ${comment.text}`} />
                </ListItem>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ maxWidth: 1400, margin: '0', padding: 0, mt: 3 }}>
            <Typography variant="h3" component="h4" gutterBottom>
                Comments
            </Typography>
            <Box sx={{
                maxHeight: 'auto', // Set a fixed height for the scrollable area
                // overflowY: 'auto', // Enable vertical scrolling within the container
                // bgcolor: 'background.paper' // Use theme's background color for consistency
            }}>
                {CommentData.map((data, index) => (
                    <List key={index} sx={{ width: '99%', padding: 0 }}>
                        {data.message.map(renderComment)}
                    </List>
                ))}
            </Box>
        </Box>
    );
};

export default CommentsViewer;
