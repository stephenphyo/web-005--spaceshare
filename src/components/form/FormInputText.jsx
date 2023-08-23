import React, { forwardRef } from 'react';

/* CSS Imports */
// import 'styles/components/form/FormInputText.css';

const FormInputText = forwardRef((props, ref) => {
    return (
        <div
            className='form_input_text'>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
                {props.label}
            </label>
            <div className='mt-2'>
                <input type='text'
                    required='required'
                    ref={ref}
                    {...props}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                    focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 disabled:bg-slate-50
                    disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none' />
            </div>
        </div>
    );
});

export default FormInputText;