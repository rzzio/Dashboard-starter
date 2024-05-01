import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';

const ActivationToggle = ({ row, handleToggleActivation }) => {
    const [isActive, setIsActive] = useState(row.inactive);

    const toggleActivation = () => {
        setIsActive(!isActive);
        handleToggleActivation(row.id, !isActive);
    };

    return (
        <Tooltip title={isActive ? 'Deactivate' : 'Activate'}>
            <IconButton onClick={toggleActivation} color={isActive ? 'primary' : 'secondary'}>
                {isActive ? <ToggleOnIcon fontSize="large" /> : <ToggleOffIcon fontSize="large" />}
            </IconButton>
        </Tooltip>
    );
};

export default ActivationToggle;