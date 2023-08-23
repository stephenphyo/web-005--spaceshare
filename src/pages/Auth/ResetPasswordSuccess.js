import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/* CSS Imports */
import 'styles/pages/ResetPasswordSuccess.css';
import 'styles/components/form/Form.css';
import 'styles/components/ui/FormHeader.css';
import 'styles/components/ui/Button.css';

/* Context Imports */
import EmailContext from 'contexts/EmailContext';

/* Component Imports */
import ButtonFilled from 'components/ui/ButtonFilled';
import LoginLayout from 'components/layout/LoginLayout';

function ResetPasswordSuccess() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useContext */
    const { email: ctxEmail } = useContext(EmailContext);

    return (
        <main>
            <LoginLayout>
                <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                    <div className="flex flex-col p-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 w-96 z-50">
                        <div>
                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    className="mx-auto h-auto w-40"
                                    src="/spaceshare_logo.svg"
                                    alt="SpaceShare" />
                                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Password Reset Successful
                                </h2>
                            </div>
                            <div className='my-6 text-center text-base font-normal'>
                                <div>
                                    <p>Your password has been reset successfully.</p>
                                    <p>You may now login to your account</p>
                                    <p id='email'>{ctxEmail['reset']}</p>
                                    <p>by using new password.</p>
                                </div>
                            </div>
                            <div>
                                <ButtonFilled
                                    onClick={() => navigate('/login', { state: { fromResetPassword: true } })}
                                >
                                    Go to Login
                                </ButtonFilled>
                            </div>
                        </div>
                    </div>
                </div>
            </LoginLayout>
        </main>
    );
}

export default ResetPasswordSuccess;