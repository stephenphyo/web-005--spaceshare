import React, { forwardRef } from 'react';

const FormInputNumber = forwardRef((props, ref) => {
    return (
        <div
            className='form-group'>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>
            <div className="mt-2">
                <input
                    type='number'
                    ref={ref}
                    {...props}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
            </div>
        </div>
    );
});

export default FormInputNumber;