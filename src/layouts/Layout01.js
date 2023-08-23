import React from 'react';
import { Outlet } from 'react-router-dom';

/* Component Imports */
import Header from 'components/Header';

function Layout01() {
    return (
        <main className='layout01'>
            <div className='app_header'>
                <Header />
            </div>
            <div className='app_body'>
                <Outlet />
            </div>
        </main>
    );
}

export default Layout01;