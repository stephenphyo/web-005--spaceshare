import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Component Imports */
import LoginLayout from 'components/layout/LoginLayout';
import FormInputText from 'components/form/FormInputText';
import FormInputPassword from 'components/form/FormInputPassword';
import FormError from 'components/form/FormError';
import ButtonFilled from 'components/ui/ButtonFilled';

/* Context Imports */
import EmailContext from 'contexts/EmailContext';
import AuthContext from 'contexts/AuthContext';

/* Function Imports */
import validateEmail from 'functions/validateEmail';
import ButtonOutlined from 'components/ui/ButtonOutlined';

function Login() {

    /* Initialization */
    const initData = { email: '', password: '' };
    const err = {};

    /* useNavigate */
    const navigate = useNavigate();

    /* useLocation */
    const location = useLocation();

    /* useParams */
    const { user } = useParams();

    /* useContext */
    const { email: ctxEmail } = useContext(EmailContext);
    const { setAuth } = useContext(AuthContext);

    /* useState */
    const [data, setData] = useState(initData);
    const [error, setError] = useState({});

    /* Functions */
    const checkEmail = (email) => {
        if (email.length === 0) {
            err['email'] = 'Email address must not be empty';
        }
        else if (!validateEmail(email)) {
            err['email'] = 'Enter a valid email address';
        }
    };

    const checkPassword = (password) => {
        if (password.length === 0) {
            err['password'] = 'Password must not be empty';
        }
        else if (password.length < 8 || password.length > 24) {
            err['password'] = 'Password must be 8-24 characters';
        }
    };

    const checkData = () => {
        checkEmail(data['email']);
        checkPassword(data['password']);

        if (Object.keys(err).length !== 0) {
            setError(err);
            return false;
        }
        else {
            setError({});
            return true;
        }
    };

    const login = () => {
        const api = `/api/auth/login/${user}`;
        if (checkData()) {
            Axios.post(api, data,
                { headers: { 'Content-Type': 'application/json' } })
                .then(res => {
                    if (res.status === 200) {
                        const data = { ...res.data, userType: user };
                        setAuth(data);
                        sessionStorage.setItem('auth', JSON.stringify(data));
                        navigate('/');
                    }
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        console.log(err.response);
                        setError(err.response.data);
                    }
                    else if (err.response.status === 401) {
                        setError(err.response.data);
                    }
                })
        };
    };

    /* useEffect */
    useEffect(() => {
        if (sessionStorage.getItem('auth')) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (location?.state?.fromRegister) {
            setData({ ...data, email: ctxEmail['register'] });
        }
        else if (location?.state?.fromReset) {
            setData({ ...data, email: ctxEmail['reset'] });
        }
    }, []);

    return (
        <main className='login'>
            <LoginLayout>

                {/* Main Content */}
                <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
                    <div className="flex flex-col p-6 md:sticky md:top-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 w-96 z-30">
                        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-auto w-40"
                                src="/spaceshare_logo.svg"
                                alt="SpaceShare" />
                            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div>
                                <FormInputText
                                    label='Enter Username or Email Address'
                                    autoFocus
                                    value={data['email'] ? data['email'] : ''}
                                    onChange={(e) => setData({ ...data, email: (e.target.value).toLowerCase() })}
                                    onKeyDown={(e) => e.key === 'Enter' && login()}
                                />
                                <FormError nbsp>{'email' in error && error['email']}</FormError>

                                <div className="mt-2"></div>
                                <FormInputPassword
                                    label='Enter Password'
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && login()}
                                />
                                <FormError nbsp>{'password' in error && error['password']}</FormError>

                                <div className="text-right text-xs mb-2">
                                    <span
                                        className="txt-primary hover:txt-primary-hover cursor-pointer w-auto"
                                        onClick={() => navigate(`/resetpassword/${user}`)}>
                                        Forgot Password?
                                    </span>
                                </div>

                                <div className='mt-5'></div>
                                <ButtonFilled
                                    onClick={() => login()}>
                                    Login
                                </ButtonFilled>
                                <div className='mt-3'></div>
                                <ButtonOutlined
                                    onClick={() => navigate('/')}>
                                    Cancel
                                </ButtonOutlined>
                            </div>

                            <p className="mt-4 mb-3 text-center text-sm text-gray-500">
                                Don't have an account?
                                <span
                                    className="font-semibold leading-6 txt-primary
                                        hover:txt-primary cursor-pointer ml-2"
                                    onClick={() => navigate('/register')}>
                                    Register
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className='form' style={{ height: '550px' }}>
                <div className='form_container'>
                    <div className='form_header'>
                        {user == 'renter' && <h3>Renter Login</h3>}
                        {user == 'tenant' && <h3>Tenant Login</h3>}
                    </div>
                    <FormInputText
                        label='Enter Email Address'
                        autoFocus
                        value={data['email']}
                        onChange={(e) => setData({ ...data, email: (e.target.value).toLowerCase() })}
                        onKeyDown={(e) => e.key === 'Enter' && login()}
                    />
                    <FormError nbsp>{'email' in error && error['email']}</FormError>

                    <FormInputPassword
                        label='Enter Password'
                        value={data['password']}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && login()}
                    />
                    <FormError nbsp>{'password' in error && error['password']}</FormError>

                    <div className='forgot_password'>
                        <span className='form_link'
                            onClick={() => user == 'renter' ? navigate('/resetpassword/renter') : navigate('/resetpassword/tenant')}>
                            Forgot Password?
                        </span>
                    </div>

                    <ButtonFilled
                        onClick={() => login()}>
                        Login
                    </ButtonFilled>

                    <div className='login_form_footer'>
                        <span className='label'>Don't have an account?</span>
                        <span className='form_link' onClick={() => navigate('/register')}>Register</span>
                    </div> */}

                {/* <section className={`login_form_options ${!formOptions && 'close'}`}>
                        <div className='login_form_options_button'
                            onClick={() => setFormOptions(!formOptions)}>
                            <div className='login_form_options_button_inner'>
                                OR
                            </div>
                        </div>
                        <div className='login_form_options_container'>
                            <div className='option'>
                                <div className='option_inner google'
                                    onClick={() => signInWithGoogle()}>
                                    <img className='option_logo' src={Google} alt='Google' />
                                    <div className='option_text'>Login with Google</div>
                                </div>
                            </div>
                            <div className='option'>
                                <div className='option_inner facebook'>
                                    <img className='option_logo' src={Facebook} alt='Facebook' />
                                    <div className='option_text'>Login with Facebook</div>
                                </div>
                            </div>
                        </div>
                    </section> */}
                {/* </div>
            </div> */}
            </LoginLayout>
        </main>
    );
}

export default Login;