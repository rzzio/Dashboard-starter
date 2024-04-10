import React from 'react';
import styles from './Card.css'; // Assuming you use CSS modules

const Card = ({ title, color, value }) => {
  return (
    <div 
      className={styles.card} 
      style={{
        background: color.backGround, 
        boxShadow: color.boxShadow
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
};

export default Card;
