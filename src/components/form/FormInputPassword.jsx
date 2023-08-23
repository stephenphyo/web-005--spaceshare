import React, { forwardRef, useState } from 'react';

/* CSS Imports */
import 'styles/components/form/FormInputPassword.css';

/* MUI Imports */
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const FormInputPassword = forwardRef((props, ref) => {

    /* useState */
    const [viewPassword, setViewPassword] = useState(false);

    return (
        <div
            className="form_input_password">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>
            <div className="relative">
                <input
                    type={viewPassword ? 'text' : 'password'}
                    required='required'
                    ref={ref}
                    {...props}
                    className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
                <span id='eye' className="absolute top-0 py-1.5 right-3">
                    {
                        !viewPassword
                            ? <VisibilityRoundedIcon onClick={() => setViewPassword(true)} />
                            : <VisibilityOffRoundedIcon onClick={() => setViewPassword(false)} />
                    }
                </span>
            </div>
        </div>
    );
});

export default FormInputPassword;