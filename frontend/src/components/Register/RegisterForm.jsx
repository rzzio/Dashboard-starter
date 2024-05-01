import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {List, ListItem} from "@mui/material";
import {makeStyles} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    errorList: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        padding: theme.spacing(1),
        marginTop: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
    },
    errorItem: {
        marginBottom: theme.spacing(1),
    },
}));

const RegisterForm = () => {
    const paperStyle = {
        padding: 20,
        width: 280,
        margin: "auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const classes = useStyles();

    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()


    const handleRegister = async () => {

        if (!validate()) return;
        try {
            const url = process.env.REACT_APP_API_URL + '/api/register'
            const params =  {
                first_name,
                last_name,
                email,
                password,
                phone:phoneNumber,

            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });


            if (response.ok) {
                navigate('/login')
            } else {
                response.json().then((data) => {
                    setErrors({response: data.message})
                } )

            }
        } catch (error) {
            return {success: false, message: 'Something wrong with server'}
        }
    };

    const validate = () => {
        let isValid = true;
        setErrors({});

        if (!first_name) {
            setErrors((prevState) => ({
                ...prevState,
                first_name: 'First name is required',
            }));
            isValid = false;
        }

        if (!last_name) {
            setErrors((prevState) => ({
                ...prevState,
                last_name: 'Last name is required',
            }));
            isValid = false;
        }

        if (!emailIsValid(email)) {
            setErrors((prevState) => ({
                ...prevState,
                email: 'Email is not valid',
            }));
            isValid = false;
        }

        if (!isPasswordValid(password)) {
            setErrors((prevState) => ({
                ...prevState,
                password: 'Password must be at least 6 characters long',
            }));
            isValid = false;
        }

        if (password !== confirmPassword) {
            setErrors((prevState) => ({
                ...prevState,
                confirmPassword: 'Passwords do not match',
            }));
            isValid = false;
        }
        if (!isPhoneNumberValid(phoneNumber)) {
            setErrors((prevState) => ({
                ...prevState,
                phoneNumber: 'Phone number is not valid',
            }));
            isValid = false;
        }


        return isValid;
    };

    const emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const isPhoneNumberValid = (phoneNumber) => {
        // You can use a regular expression or other validation logic for phone numbers
        return /^\d{10}$/.test(phoneNumber);
    };

    const isPasswordValid = (password) => {
        return password.length >6;
    };

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
                    <h2>Sign Up</h2>
                    <TextField
                        label="First Name"
                        placeholder="Enter your first name"
                        fullWidth
                        required
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        label="Last Name"
                        placeholder="Enter your last name"
                        fullWidth
                        required
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        placeholder="Enter your email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        fullWidth
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        type="password"
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {Object.keys(errors).length > 0 && (
                        <List dense className={classes.errorList}>
                            {Object.entries(errors).map(([key, value]) => (
                                <ListItem key={key} className={classes.errorItem}>
                                    {value}
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <Button
                        type="button"
                        onClick={handleRegister}
                        color="primary"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Sign Up
                    </Button>
                    <Typography>
                        Already have an account?
                        <Link href="/login">Sign In</Link>
                    </Typography>
                </Paper>
            </Grid>

        </div>
    );
};

export default RegisterForm;