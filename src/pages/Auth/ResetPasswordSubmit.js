import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

/* CSS Imports */
import 'styles/pages/ResetPasswordSubmit.css';
import 'styles/components/form/Form.css';
import 'styles/components/ui/FormHeader.css';
import 'styles/components/ui/Button.css';

/* Component Imports */
import FormInputPassword from 'components/form/FormInputPassword';
import FormError from 'components/form/FormError';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Function Imports */
import validatePassword from 'functions/validatePassword';
import LoginLayout from 'components/layout/LoginLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';

function ResetPasswordSubmit() {

    /* Initialization */
    const err = {};

    /* useNavigate */
    const navigate = useNavigate();

    /* useLocation */
    const location = useLocation();

    /* useParams */
    const params = useParams();

    /* useState */
    const [password, setPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');
    const [error, setError] = useState({});

    /* Functions */
    const checkPassword = (initPwd, cfmPwd) => {
        if (initPwd.length === 0) {
            err['password'] = 'Password must not be empty';
        }
        else if (initPwd.length < 8) {
            err['password'] = 'Password length must be greater than 8';
        }
        else if (initPwd.length > 24) {
            err['password'] = 'Password length must be less than 24';
        }
        else if (!validatePassword(password)) {
            err['password'] = 'Password must contain at least one uppercase, lowercase, number and special character';
        }
        else if (cfmPwd !== initPwd) {
            err['cfmPassword'] = 'Passwords do not match';
        }
    };

    const handleSubmit = () => {
        checkPassword(password, cfmPassword);

        if (Object.keys(err).length !== 0) {
            setError(err);
        } else {
            Axios.patch(`/accounts/resetpassword/${params.id}/reset`,
                {
                    password: password,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
                .then(res => {
                    if (res.status === 200)
                        navigate(`/resetpassword/${params.id}/success`)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    return (
        <main>
            <LoginLayout>
                <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                    <div className="flex flex-col p-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 w-96 z-50">
                        <div>
                            <div>
                                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                    <img
                                        className="mx-auto h-auto w-40"
                                        src="/spaceshare_logo.svg"
                                        alt="SpaceShare" />
                                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                        Reset Password
                                    </h2>
                                </div>
                                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                    <FormInputPassword
                                        label='Enter New Password'
                                        autoFocus
                                        onInput={(e) => setPassword(e.target.value)}
                                        onChange={() => setError({})}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                    />
                                    <FormError nbsp>{'password' in error && error['password']}</FormError>
                                    <FormInputPassword
                                        label='Confirm New Password'
                                        onInput={(e) => setCfmPassword(e.target.value)}
                                        onChange={() => setError({})}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                    />
                                    <FormError nbsp>{'cfmPassword' in error && error['cfmPassword']}</FormError>
                                    <div className='mt-3 mb-3'>
                                        <ButtonFilled onClick={() => handleSubmit()}>
                                            Reset Password
                                        </ButtonFilled>
                                    </div>
                                    <div className='mt-3 mb-4'>
                                        <ButtonOutlined
                                            onClick={() => navigate('/resetpassword')}>
                                            Cancel
                                        </ButtonOutlined>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoginLayout>
        </main>
    );
}

export default ResetPasswordSubmit;