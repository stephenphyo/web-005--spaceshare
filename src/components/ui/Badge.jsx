import React from 'react';

const Badge = ({ status, children }) => {
    const badgeColors = {
        danger: 'bg-red-50 text-red-700 ring-red-600/10',
        warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
        success: 'bg-green-50 text-green-700 ring-green-600/20',
        primary: 'bg-blue-50 text-blue-700 ring-blue-700/10',
    };

    const badgeColor = badgeColors[status] || badgeColors['success'];

    return (
        <div className="flex justify-end">
            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColor}`}>
                {children}
            </span>
        </div>
    );
};

export default Badge;
