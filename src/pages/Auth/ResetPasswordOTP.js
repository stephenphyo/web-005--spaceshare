import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/* CSS Imports */
import 'styles/pages/ResetPasswordOTP.css';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Context Imports */
import ResetPasswordContext from 'contexts/ResetPasswordContext';

/* Component Imports */
import FormError from 'components/form/FormError';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';

/* Hook Imports */
import useCountDownTimer from 'hooks/useCountDownTimer';

/* Function Imports */
import convertTimeString from 'functions/convertTimeString';
import LoginLayout from 'components/layout/LoginLayout';

function ResetPasswordOTP() {

    /* Initialization */
    const OTP_MAX_LENGTH = 6;
    const OTP_TTL = 300;

    /* useNavigate */
    const navigate = useNavigate();

    /* useParams */
    const params = useParams();

    /* useContext */
    const { resetAccount: ctxResetAccount, recaptchaToken } = useContext(ResetPasswordContext);

    /* useState */
    const [render, setRender] = useState(false);
    const [OTP, setOTP] = useState(' '.repeat(6));
    const [error, setError] = useState('');

    /* useRef */
    const inputRef = useRef([]);

    /* Custom Hooks */
    const [countdown, actionCountDown] = useCountDownTimer(OTP_TTL);

    /* Functions */
    const handleInput = (e, index) => {
        if (e.target.value) {
            // Input is a Number
            if (/^\d+$/.test(e.target.value)) {
                setOTP(OTP.substring(0, index) + e.target.value + OTP.substring(index + 1));
                // Focus to Next OTP Input
                if (index !== OTP_MAX_LENGTH - 1) {
                    inputRef.current[index + 1].focus();
                }
            }
            // Input is Not a Number
            else {
                setOTP(OTP.substring(0, index) + ' ' + OTP.substring(index + 1));
                // setTimeout() buys some time until the DOM elements are loaded, even if timeout is set to 0,
                // and the callback function inside setTimeout() will be queued up
                setTimeout(() => inputRef.current[index].select(), 0);
            }
        };
    };

    const handleKeyEvents = (e, index) => {
        if (e.key === 'Backspace' && index !== -1) {
            setOTP(OTP.substring(0, index) + ' ' + OTP.substring(index + 1));
            if (index !== 0) {
                inputRef.current[index - 1].focus();
                setTimeout(() => inputRef.current[index - 1].select(), 0);
            } else {
                inputRef.current[index].focus();
                setTimeout(() => inputRef.current[index].select(), 0);
            }
        }
        else if (e.key === 'ArrowLeft' && index !== 0) {
            inputRef.current[index - 1].focus();
            setTimeout(() => inputRef.current[index - 1].select(), 0);
        }
        else if (e.key === 'ArrowRight' && index < OTP_MAX_LENGTH - 1) {
            inputRef.current[index + 1].focus();
            setTimeout(() => inputRef.current[index + 1].select(), 0);
        }
        else if ((e.key === 'Backspace' || e.key === 'ArrowLeft') && index === 0) {
            setTimeout(() => inputRef.current[0].select(), 0);
        }
        else if (e.key === 'ArrowRight' && index === OTP_MAX_LENGTH - 1) {
            setTimeout(() => inputRef.current[OTP_MAX_LENGTH - 1].select(), 0);
        }
        else if (e.key === 'Enter') handleSubmit();
    };

    const sendOTP = () => {
        actionCountDown('RESET');
        Axios.get(`/api/auth/resetpassword/${params.user}/${params.id}/otp`)
            .then(res => {
                if (res.status === 200) {
                    actionCountDown('START');
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const handleSubmit = () => {
        if (!OTP.includes(' ')) {
            Axios.post(`/api/auth/resetpassword/${params.user}/${params.id}/otp/verify`,
                { otp: OTP },
                { headers: { 'Content-Type': 'application/json' } }
            )
                .then(res => {
                    if (res.status === 200) {
                        console.log('OK');
                    }
                    navigate(`/resetpassword/${params.user}/${params.id}/submit`, { state: res.data.data });
                })
                .catch(err => {
                    if (err?.response?.status === 401) { setError('OTP Verification Failed') };
                })
        }
    };

    /* useEffect */
    useEffect(() => {
        if (!ctxResetAccount.id) {
            navigate(`/resetpassword/${params.user}`);
        } else {
            setRender(true);
            sendOTP();
        }
    }, []);

    useEffect(() => {
        render && inputRef.current[0].focus();
    }, [render]);

    return (
        <main>
            <LoginLayout>
                <div className='flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8'>
                    <div className='flex flex-col p-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 w-96 z-50'>
                        <div>
                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    className="mx-auto h-auto w-40"
                                    src="/spaceshare_logo.svg"
                                    alt="SpaceShare" />
                                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Verify it's you
                                </h2>
                                <div className='flex flex-col text-sm text-center my-6'>
                                    <p>
                                        Email with a 6-digit OTP for password reset has been sent to your email address:
                                    </p>
                                    <p className='mt-3 mb-3 text-base'
                                        style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                                        {ctxResetAccount.email}
                                    </p>
                                    <p>Please check your email and enter OTP to reset your password.</p>
                                </div>
                            </div>
                            <div className='otp_input_container'>
                                {Array(OTP_MAX_LENGTH).fill().map((_, index) => (
                                    <input className='otp_input' key={index}
                                        type='text'
                                        name='otp'
                                        ref={e => inputRef.current[index] = e}
                                        required='required'
                                        value={OTP[index]}
                                        inputMode='numeric'
                                        autoComplete='one-time-code'
                                        maxLength='1'
                                        onFocus={(e) => e.target.select()}
                                        onInput={(e) => handleInput(e, index)}
                                        onChange={() => setError('')}
                                        onKeyDown={(e) => handleKeyEvents(e, index)}
                                    />
                                ))}
                            </div>
                            <div className='ml-2'>
                                <FormError nbsp>{error}</FormError>
                            </div>
                            <div className='text-base font-medium text-sm flex px-2'>
                                <div className='form_link d-inline-block hover:cursor-pointer hover:txt-primary'
                                    onClick={() => sendOTP()}>
                                    Resend OTP
                                </div>
                                <div className='form_link d-inline-block ml-auto'
                                    style={{ pointerEvents: 'none' }}>
                                    {`${convertTimeString(countdown).mm}:${convertTimeString(countdown).ss}`}
                                </div>
                            </div>
                            <div className='mt-5'>
                                <ButtonFilled
                                    onClick={() => handleSubmit()}>
                                    Continue
                                </ButtonFilled>
                            </div>
                            <div className='mt-3 mb-4'>
                                <ButtonOutlined
                                    onClick={() => navigate(`/resetpassword/${params.user}`)}>
                                    Back
                                </ButtonOutlined>
                            </div>
                        </div>
                    </div>
                </div>
            </LoginLayout>
        </main >
    );
};

export default ResetPasswordOTP;