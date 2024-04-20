import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      background: 'linear-gradient(to right, #ece9e6, #ffffff)',
    },
    heading: {
      fontSize: '72px',
      color: '#333',
    },
    text: {
      fontSize: '24px',
      color: '#666',
    },
    link: {
      marginTop: '20px',
      padding: '10px 25px',
      backgroundColor: '#FF919D',
      color: '#fff',
      borderRadius: '5px',
      textDecoration: 'none',
      fontSize: '18px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! The page you're looking for isn't here.</p>
      <p style={styles.text}>You might have the wrong address, or the page may have moved.</p>
      <Link to="/dashboard" style={styles.link}>Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
