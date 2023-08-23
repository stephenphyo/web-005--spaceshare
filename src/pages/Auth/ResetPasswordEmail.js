import React, { useContext, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/* 3rd Party Package Imports */
import ReCAPTCHA from 'react-google-recaptcha';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Component Imports */
import FormInputText from 'components/form/FormInputText';
import FormError from 'components/form/FormError';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';

/* Context Imports */
import ResetPasswordContext from 'contexts/ResetPasswordContext';

/* Function Imports */
import validateEmail from 'functions/validateEmail';
import LoginLayout from 'components/layout/LoginLayout';

function ResetPasswordEmail() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useParam */
    const params = useParams();

    /* useState */
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    /* useRef */
    const recaptchaRef = useRef();

    /* useContext */
    const { setResetAccount, setRecaptchaToken } = useContext(ResetPasswordContext);

    /* Functions */
    const checkEmail = () => {
        if (email.length === 0) {
            setError('Email address must not be empty')
            return false;
        }
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return false;
        }
        return true;
    };

    const checkRecaptcha = () => {
        const recaptchaToken = recaptchaRef.current.getValue();
        if (!recaptchaToken) {
            setError('Invalid reCaptcha');
            return null;
        }
        return true;
    };

    const resetPassword = () => {
        if (checkEmail() && checkRecaptcha()) {
            Axios.post(`/api/auth/resetpassword/${params.user}`,
                { email: email, recaptchaToken: recaptchaRef.current.getValue() },
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => {
                    if (res.status === 200) {
                        setResetAccount({ id: res.data.id, email: res.data.email });
                        navigate(`/resetpassword/${params.user}/${res.data.id}/otp`);
                    }
                })
                .catch(err => {
                    if (err?.response?.status === 404) {
                        setError('Email address does not exist');
                        recaptchaRef.current.reset();
                    }
                    else if (err?.response?.status === 400) {
                        setError('You are a Robot');
                        recaptchaRef.current.reset();
                    }
                })
            setError('');
        };
    };

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
                                    Forgot Password?
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <div>
                                    <FormInputText
                                        label='Enter Email Address'
                                        autoFocus
                                        onChange={(e) => {
                                            setError('');
                                            setEmail((e.target.value).toLowerCase());
                                        }}
                                        onKeyPress={(e) => e.key === 'Enter' && resetPassword()} />
                                    <FormError nbsp>{error}</FormError>

                                    <div className="d-flex justify-content-center mt-3 ml-4" style={{ alignItems: 'center', alignContent: 'center' }}>
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                                            onChange={() => {
                                                setRecaptchaToken(recaptchaRef.current.getValue());
                                                console.log(recaptchaRef.current.getValue());
                                            }}
                                            theme='light' />
                                    </div>

                                    <div className='mt-4'>
                                        <ButtonFilled
                                            onClick={() => resetPassword()}>
                                            Reset Password
                                        </ButtonFilled>
                                    </div>
                                    <div className='mt-3 mb-4'>
                                        <ButtonOutlined
                                            onClick={() => navigate('/login')}>
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

export default ResetPasswordEmail;