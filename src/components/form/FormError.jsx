import React from 'react';

function FormError(props) {
    return (
        <div className='bg-transparent mt-1 ml-8 tracking-widest text-xs text-red-500'>
            <span>{props.children}</span>
            {props.nbsp && <span>&nbsp;</span>}
        </div>
    );
}

export default FormError;