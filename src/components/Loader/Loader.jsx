import React from 'react';

/* CSS Imports*/
import './Loader.css';

/* MUI Imports */
import { CircularProgress } from '@mui/material';

function Loader(props) {
    return (
        <div className={`loading-page`}>
            <CircularProgress />
        </div>
    );
}

export default Loader;