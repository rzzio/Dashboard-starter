export const makePriorityStyles = (priority) => {
  const priorityStyles = {
    'High': {
      backgroundColor: '#ff6347', // Tomato
      color: 'white',
    },
    'Medium': {
      backgroundColor: '#ffd700', // Gold
      color: 'black',
    },
    'Low': {
      backgroundColor: '#90ee90', // Light Green
      color: 'darkgreen',
    },
    'Critical': {
      backgroundColor: '#dc143c', // Crimson
      color: 'white',
    }
  };
  return priorityStyles[priority] || { backgroundColor: '#d3d3d3', color: 'black' }; // Default style
};

export const makeStyles = (status) => {
  const statusStyles = {
    'Completed': {
      backgroundColor: 'rgb(145 254 159 / 47%)',
      color: 'green',
    },
    'Pending': {
      backgroundColor: '#ffadad8f',
      color: 'red',
    },
    'In Progress': {
      backgroundColor: '#59bfff',
      color: 'white',
    }
  };
  return statusStyles[status] || { backgroundColor: '#d3d3d3', color: 'black' }; // Default style
};
