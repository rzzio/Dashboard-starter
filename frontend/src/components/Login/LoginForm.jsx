import React, { useState, useContext } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthConsumer from '../../context/authContext';

const LoginForm = () => {
  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = AuthConsumer()
  const navigate = useNavigate()
  const { state } = useLocation();

  const handleLogin = async () => {
    if(email.length <= 1  || password.length <= 1) return
    if(!validate(email,password)) return

    const response = await login(email,password)

    if(response.success){
      return navigate(state?.path || '/dashboard')
    }
    else{
      setErrors({response: response.message})
    }

  };

  const validate = (email, password) => {
    let isValid = true
    setErrors({})
      if(!emailIsValid(email)){
        setErrors(prevState => ({
          ...prevState,
          email: 'Email is not valid'
        }));
        isValid = false
      }
      if(!isPasswordValid(password)){
        setErrors(prevState => ({
          ...prevState,
          password: 'Password  must be greater than 6'
        }));
        isValid = false
      }
      return isValid

  }
  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  function isPasswordValid(password){
    return password.length >= 6
  }

  return (
      <div className="App">
        <Grid
            container
            style={{ height: '100%' }}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
          <Paper elevation={10} style={paperStyle}>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
            {errors.response && <p>{errors.response}</p>}
            <TextField
                label="Email"
                placeholder="Enter Email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors?.email && <p style={{color: "black"}}>{errors.email}</p>}
            {errors?.password && <p style={{color: "black"}}>{errors.password}</p>}
            <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
            />
            <Button
                type="button"
                onClick={handleLogin}
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
            >
              Sign in
            </Button>
            <Typography>
              <Link href="#">Forgot password?</Link>
            </Typography>
            <Typography>
              Do you have an account?
              <Link href="/register">Sign Up</Link>
            </Typography>
          </Paper>
        </Grid>
      </div>
  );
};

export default LoginForm;