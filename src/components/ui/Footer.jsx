import React from 'react';
import { useNavigate } from 'react-router';

function Footer() {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <footer>
            <div className="bg-white py-10 px-4 border-t border-gray-200">
                <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        <div
                            className="hover:txt-primary inline-block hover:cursor-pointer"
                            onClick={() => navigate('/')}>
                            SpaceShare
                        </div>
                    </span>
                </div>
            </div>
            <p className="flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                Developed by Team7
            </p>
        </footer>

    );
}

export default Footer;