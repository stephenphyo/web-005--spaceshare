import React from 'react';

/* CSS Imports */
import 'styles/components/ui/Button.css';

function ButtonFilled(props) {
    return (
        <button
            type="button"
            className="btn-primary w-full inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            {...props}
        >
            {props.children}
        </button>
    );
}

export default ButtonFilled;