import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

const AuthChecker = (props) => {

    /* useNavigate */
    const navigate = useNavigate();

    /* useContext */
    const { auth, setAuth } = useContext(AuthContext);

    /* useEffect */
    useEffect(() => {
        if (sessionStorage.getItem('auth')) {
            setAuth(JSON.parse(sessionStorage.getItem('auth')));
        }
        else navigate('/login');
    }, []);

    // useEffect(() => {
    //     if (auth) {
    //         navigate('/');
    //     }
    // }, [auth]);

    return (
        <div className='auth-checker'>
            {props.children}
        </div>
    );
};

export default AuthChecker;
