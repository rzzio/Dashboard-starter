import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BorderAllRounded, BorderColor, NavigateBefore, NavigateNextSharp } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const paperStyle = {
    padding: 20,
    width: 280, // Adjust width as needed
    margin: "auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // BorderAllRounded: true,
    // BorderColor:'red'
    
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* <div className="AppGlass"> */}
        <Grid
          container
          style={{ height: '100%' }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          
        >
          <Paper elevation={10} style={paperStyle}>
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>Sign In</h2>
            <TextField label='Email' placeholder='Enter Email' fullWidth required />
            <TextField label='Password' placeholder='Enter password' type='password' fullWidth required />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button type='submit'
            onClick={()=>navigate('../dashboard')}
            
              color='primary'
               variant="contained"
                style={btnstyle}
                 fullWidth>Sign in</Button>
            <Typography >
              <Link href="#" >
                Forgot password?
              </Link>
            </Typography>
            <Typography> Do you have an account?
              <Link href="#" >
                Sign Up
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
    // </div>
  );
}

export default LoginForm;
