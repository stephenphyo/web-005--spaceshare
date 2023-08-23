import React from 'react';

const GoogleMap = ({ apiKey, query, zoom }) => {
    const encodedLocation = encodeURIComponent(query);

    return (
        <div className='w-full h-96 rounded-lg my-8'>
            <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedLocation}&zoom=${zoom}`}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='w-full h-full rounded-lg'>
            </iframe>
        </div>
    );
};

export default GoogleMap;
