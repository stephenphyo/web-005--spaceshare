import { createContext, useState } from 'react';

/* Context */
const ResetPasswordContext = createContext();
export default ResetPasswordContext;

/* Context Provider */
export const ResetPasswordContextProvider = (props) => {

    /* useState */
    const [resetAccount, setResetAccount] = useState({});
    const [recaptchaToken, setRecaptchaToken] = useState('');

    /* Context Values */
    const value = {
        resetAccount, setResetAccount,
        recaptchaToken, setRecaptchaToken
    };

    return (
        <ResetPasswordContext.Provider value={value}>
            {props.children}
        </ResetPasswordContext.Provider>
    );
}