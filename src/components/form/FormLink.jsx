import React from 'react';

/* CSS Imports */
import 'styles/components/form/FormLink.css';

function FormLink(props) {
    return (
        <span className='form_link'
            {...props}>
            {props.children}
        </span>
    );
}

export default FormLink;