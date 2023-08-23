import React from 'react';

function Modal(props) {
    return (
        <div class='loading-page d-flex align-items-center justify-content-center position-absolute top-0 left-0 w-100 h-100 bg-dark opacity-75'>
            {props.children}
        </div>
    );
}

export default Modal;