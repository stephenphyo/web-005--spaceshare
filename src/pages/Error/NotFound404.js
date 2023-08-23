import React from 'react';
import { useNavigate } from 'react-router';

/* Layout Imports */
import Layout from 'components/layout/Layout';

function NotFound404() {

    /* useNavigate */
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="text-center min-h-[calc((100vh-201px)-12rem)]">
                <p className="text-2xl font-semibold text-red-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Page Not Found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Sorry, the page you are looking for could not be found
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <div
                        className="btn-primary rounded-md px-3.5 py-2.5 text-sm font-semibold text-white
                            shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 cursor-pointer"
                        onClick={() => navigate("/")}>
                        Return back to home page
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NotFound404;