import React from 'react';
import { CommentData } from '../../Data/Data';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Box } from '@mui/material';

const CommentsViewer = () => {
    // Function to sort comments by date in descending order (newest first)
    const sortedMessages = (messages) => {
        return messages.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    };

    // Function to render individual comments in separate cards
    const renderComment = (comment, index) => {
        return (
            <Card key={index} sx={{ marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <ListItem divider>
                        <ListItemText 
                            primary={
                                <React.Fragment>
                                    <strong>{comment.name}</strong>&nbsp;{comment.text}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </CardContent>
                {comment.isAdmin && (
                    <Box sx={{
                        color: 'white',
                        bgcolor: 'darkgreen',
                        borderRadius: '12px',
                        padding: '4px 8px',
                        marginRight: 2,
                        fontSize: '0.875rem'
                    }}>
                       From Support
                    </Box>
                )}
            </Card>
        );
    };

    return (
        <Box sx={{ maxWidth: 1400, margin: '0', padding: 0, mt: 2 }}>
            <Typography variant="h5" component="h4" gutterBottom>
                Recent Comments
            </Typography>
            <Box sx={{
                maxHeight: 'auto',
                // overflowY: 'auto',
                // bgcolor: 'background.paper'
            }}>
                {CommentData.map((data, index) => (
                    <List key={index} sx={{ width: '90%', padding: 0 }}>
                        {sortedMessages(data.message).map(renderComment)}
                    </List>
                ))}
            </Box>
        </Box>
    );
};

export default CommentsViewer;
