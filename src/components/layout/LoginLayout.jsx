import React from 'react';

const LoginLayout = (props) => {

    const bgImgUrl = "https://images.unsplash.com/photo-1675449215007-def921b7c0ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80";

    return (
        <div className="relative min-h-screen">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${bgImgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            />
            <div
                className="absolute inset-0 bg-black opacity-60"
                style={{ mixBlendMode: 'multiply' }}
            />

            {/* Main Content */}
            {props.children}
            <div className="absolute bottom-0 left-0 w-full p-2 text-white text-center">
                <span
                    className="text-xs">
                    Background image from
                    <a
                        href="https://unsplash.com/photos/iSmekgHuBN4"
                        target="_blank"
                        className="underline ml-1"
                        rel="noopener noreferrer">
                        Unsplash
                    </a>
                </span>
            </div>
        </div>
    );
}

export default LoginLayout;