import React from 'react';

import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';

const SearchLayout = ({ children }) => {
    return (
        <div>
            <Header></Header>
            {/* Main Content */}
            <div className="py-16 sm:py-24">
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default SearchLayout;