import React from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Box, Grid } from '@mui/material';

const CommentsViewer = ({ CommentData }) => {
  // Function to sort comments by date in descending order (newest first)
  const sortedMessages = (messages) => {
    return messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };

  // Function to render individual comments in separate cards, including image thumbnails
  const renderComment = (comment, index) => {
    return (
      <Card key={index} sx={{ marginBottom: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '96%', alignItems: 'center' }}>
            <ListItemText
              primary={
                <React.Fragment>
                  <strong>{comment?.creator.first_name + ' ' + comment?.creator.last_name}</strong>&nbsp;{comment.description}
                </React.Fragment>
              }
            />
            {comment.creator.is_technician && (
              <Box sx={{
                color: 'white',
                bgcolor: 'darkgreen',
                borderRadius: '12px',
                padding: '4px 8px',
                fontSize: '0.875rem',
                alignSelf: 'center'
              }}>
                Support
              </Box>
            )}
          </Box>
          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            {comment.attachments && comment.attachments.map((url, i) => (
              <Grid item key={i} xs={4} sm={2}>
                <a href={url.file_url} target="_blank" rel="noopener noreferrer">
                  <Box component="img" src={url.file_url} alt={`Attachment ${i + 1}`} sx={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </a>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ maxWidth: 1400, margin: '0', padding: 0, mt: 3 }}>
      <Box sx={{
        maxHeight: 'auto',
      }}>
        {/*{CommentData.map((data, index) => (*/}
        {/*    <List sx={{ width: '100%', padding: 0 }}>*/}
        {sortedMessages(CommentData).map(renderComment)}
        {/*</List>*/}
        {/*))}*/}
      </Box>
    </Box>
  );
};

export default CommentsViewer;
