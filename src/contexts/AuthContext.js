import { createContext, useEffect, useState } from 'react';

/* Context */
const AuthContext = createContext();
export default AuthContext;

/* Context Provider */
export const AuthContextProvider = (props) => {

    /* useState */
    const [auth, setAuth] = useState();

    /* useEffect */
    useEffect(() => {
        if (sessionStorage.getItem('auth')) {
            setAuth(JSON.parse(sessionStorage.getItem('auth')));
        }
    }, []);

    /* Context Values */
    const value = {
        auth, setAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}