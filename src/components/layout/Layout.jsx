import React, { useEffect, useRef } from 'react';

import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';

const Layout = (props) => {

    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Header></Header>

            {/* Main Content */}
            <div
                className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
                ref={containerRef}>
                {props.children}
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Layout;
