import React, { useState } from 'react';
import { SingleTicketDetail } from '..//../Data/Data';
import styles from './TicketDetails.module.css';  // Import the styles
import { makePriorityStyles, makeStyles } from './TicketStyles'; // Import styling functions

const TicketDetails = () => {
  const [ticketStatus, setTicketStatus] = useState(SingleTicketDetail.map(ticket => ticket.status)); // Initialize status for each ticket

  const handleStatusChange = (index, newStatus) => {
    const updatedStatus = [...ticketStatus];
    updatedStatus[index] = newStatus;
    setTicketStatus(updatedStatus);
  };

  return (
    <div>
      {SingleTicketDetail.map((ticket, index) => (
        <div key={index} className={styles.ticketContainer}>
          <select 
            className={styles.statusDropdown} 
            value={ticketStatus[index]} 
            onChange={(e) => handleStatusChange(index, e.target.value)}
          >
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
          </select>
          <h1 className={styles.ticketHeader}>{ticket.title}</h1>
          <p className={styles.ticketText}>Created At: <span className={styles.ticketHighlight}>{ticket.createdat}</span></p>
          <p className={styles.ticketText}>User Email: <span className={styles.ticketHighlight}>{ticket.useremail}</span></p>
          <p className={styles.ticketText}>
            Priority: <span className={`${styles.priority} ${styles.ticketHighlight}`} style={makePriorityStyles(ticket.priority)}>{ticket.priority}</span>
          </p>
          <p className={styles.ticketText}>
            Status: <span className={styles.ticketHighlight} style={makeStyles(ticketStatus[index])}>{ticketStatus[index]}</span>
          </p>
          <p className={styles.ticketText}>Admin: <span className={styles.ticketHighlight}>{ticket.admin}</span></p>
          <p className={styles.ticketText}>Description: {ticket.description}</p>
          <div className={styles.attachmentSection}>
            <p className={styles.ticketText}>Attachments:</p>
            <div className={styles.attachmentImages}>
              {ticket.attachment && ticket.attachment.length > 0 ? (
                ticket.attachment.map((url, idx) => (
                  <img key={idx} src={url} alt={`Attachment ${idx + 1}`} className={styles.attachmentImage} onClick={() => window.open(url, '_blank')} />
                ))
              ) : <span className={styles.noData}>No Attachments</span>}
            </div>
          </div>
          {/* <p className={styles.ticketText}>Comments: {ticket.comments ? ticket.comments : <span className={styles.noData}>No Comments</span>}</p> */}
        </div>
      ))}
    </div>
  );
};

export default TicketDetails;
