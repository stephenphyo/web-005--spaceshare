import React from 'react';

function ButtonOutlined(props) {
    return (
        <button
            type="button"
            className="w-full inline-flex items-center justify-center
                rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            {...props}>
            {props.children}
        </button>
    );
};

export default ButtonOutlined;
