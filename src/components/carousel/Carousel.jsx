import React, { useState, useEffect } from 'react';

/* Component Imports */
import CarouselItem from './CarouselItem';

/* Asset Imports */
import defaultImage from 'assets/images/default.jpeg';

const Carousel = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [items]);

    const nextSlide = (e) => {
        e.stopPropagation();
        setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div className='relative w-full mb-10'>
            <div className='relative h-56 md:h-96 overflow-hidden rounded-lg'>
                {
                    items.length === 0
                        ?
                        <img
                            src={defaultImage}
                            className='w-full items-center justify-center'
                            alt='default' />
                        : items.map((item, index) => (
                            <CarouselItem
                                key={index}
                                item={item}
                                active={index === activeIndex}
                            />
                        ))}
            </div>

            {/* Slider Indicators */}
            <div className='absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2'>
                {items.map((_, index) => (
                    <button
                        key={index}
                        type='button'
                        className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-gray-500'}`}
                        aria-current={index === activeIndex}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => setActiveIndex(index)}>
                    </button>
                ))}
            </div>

            {/* Slider controls */}
            {
                items.length > 1 &&
                <>
                    <button
                        type='button'
                        className='absolute top-0 left-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
                        onClick={prevSlide}>
                        {/* Previous icon SVG here */}
                        <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-white'>
                            <svg className='w-3 h-3 text-black' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 1 1 5l4 4' />
                            </svg>
                            <span className='sr-only'>Previous</span>
                        </span>
                    </button>

                    <button
                        type='button'
                        className='absolute top-0 right-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
                        onClick={nextSlide}>
                        {/* Next icon SVG here */}
                        <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-white'>
                            <svg className='w-3 h-3 text-black' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4' />
                            </svg>
                            <span className='sr-only'>Next</span>
                        </span>
                    </button>
                </>
            }
        </div>
    );
};

export default Carousel;
