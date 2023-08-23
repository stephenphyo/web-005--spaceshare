import React from 'react';

const CarouselItem = ({ item, active }) => {
    const carouselItemClasses = `duration-700 ease-in-out absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2
        ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    return (
        <div
            className={carouselItemClasses}
            data-carousel-item>
            <img
                src={item?.imageUrl}
                className="w-full items-center justify-center"
                alt={item.id} />
        </div>
    );
};

export default CarouselItem;
