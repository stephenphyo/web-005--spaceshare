import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* CSS Imports */
import 'styles/pages/Search.css';

/* Context Imports */
import SearchContext from 'contexts/SearchContext';

/* Icon Imports */
import { Disclosure, Menu } from '@headlessui/react';
import { MinusIcon, PlusIcon, CheckIcon } from '@heroicons/react/20/solid';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Component Imports */
import Heading from 'components/ui/Heading';
import SearchForm from 'components/ui/SearchForm';
import Carousel from 'components/carousel/Carousel';
import ButtonWishlist from 'components/ui/ButtonFavorite';
import Badge from 'components/ui/Badge';
import CardProperties from 'components/ui/CardProperties';
import SearchLayout from 'components/layout/SearchLayout';
import Dropdown from 'components/ui/Dropdown';

const ListingSearch = () => {

    /* useState */
    const [rendered, setIsRendered] = useState(false);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOption, setFilterOption] = useState('all');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    /* useContext */
    const { searchKeyword, setSearchKeyword, postType } = useContext(SearchContext);

    /* useNavigate */
    const navigate = useNavigate();

    /* useLocation */
    const location = useLocation();

    /* Functions */
    const search = (postType, page, keyword) => {
        setCurrentPage(page);

        let searchAPI = '';
        if (postType !== '' && keyword === '') {
            searchAPI = `/api/property/search?postType=${postType}&page=${page}`
        }
        else if (postType === '' && keyword !== '') {
            searchAPI = `/api/property/search?keyword=${keyword}&page=${page}`
        }
        else if (postType === '' && keyword === '') {
            searchAPI = `/api/property/?page=${page}`
        }
        else {
            searchAPI = `/api/property/search?postType=${postType}&keyword=${keyword}&page=${page}`
        }

        Axios.get(searchAPI)
            .then(res => {
                if (res.status === 200) {
                    setProperties(res.data.content);
                    setTotalPages(res.data.totalPages);
                }
                setLoading(false);
                window.scrollTo({ top: 20, behavior: 'smooth' });
            })
            .catch(err => {
                // console.log(err);
                if (err.response.status === 404) {
                    setError(err.response.data);
                }
                else if (err.response.status === 500) {
                    setError(err.response.data);
                }
                setLoading(false);
            })
    };

    /* useEffect */
    useEffect(() => {
        setIsRendered(true);
    }, []);

    useEffect(() => {
        if (!rendered) return;

        setLoading(true);
        search(postType, 0, searchKeyword);
    }, [rendered]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    const sortOptions = [
        { name: 'Most Popular', href: '#', current: true },
        { name: 'Best Rating', href: '#', current: false },
        { name: 'Newest', href: '#', current: false },
        { name: 'Price: Low to High', href: '#', current: false },
        { name: 'Price: High to Low', href: '#', current: false },
    ]
    const subCategories = [
        { name: 'HDB', href: '#' },
        { name: 'Condo', href: '#' },
        { name: 'Studio', href: '#' },
        { name: '2 Bedrooms', href: '#' },
        { name: 'Whole Flat', href: '#' },
    ]
    const filters = [
        {
            id: 'color',
            name: 'Bedroom',
            options: [
                { value: 'studio', label: 'studio', checked: false },
                { value: '1', label: '1', checked: false },
                { value: '2', label: '2', checked: true },
                { value: '3', label: '3', checked: false },
                { value: '4', label: '4', checked: false },
                { value: '5+', label: '5', checked: false },
            ],
        },
        {
            id: 'category',
            name: 'Price',
            options: [
                { value: '$100-500', label: '$100-500', checked: false },
                { value: '$500-1000', label: '$500-1000', checked: false },
                { value: '$1000-1500', label: '$1000-1500', checked: true },
                { value: '$1500+', label: '$1500+', checked: false },
                { value: 'accessories', label: 'Accessories', checked: false },
            ],
        },
        {
            id: 'size',
            name: 'Bathroom',
            options: [
                { value: '1', label: '1', checked: false },
                { value: '2', label: '2', checked: false },
                { value: '3', label: '3', checked: false },
                { value: '4', label: '4', checked: false },
                { value: '5+', label: '5+', checked: false },
            ],
        },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <SearchLayout>
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <Heading title="Search Properties" />
            </div>
            <div className="searchbar-container sm:col-span-1 md:col-span-12 flex items-center sticky top-[65px] z-20 gap-x-6 px-4 lg:px-8 py-8 border-b border-opacity-5">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 items-center justify-between gap-x-2">
                        <div className="col-span-1 md:col-span-7">
                            <SearchForm
                                searchKeyword={searchKeyword}
                                setSearchKeyword={setSearchKeyword}
                                search={() => search(postType, 0, searchKeyword)} />
                        </div>
                        <div className="col-span-1 mt-4 md:col-span-5 md:mt-0 flex gap-x-2 flex-grow">
                            <Dropdown title="Property Type">

                                {/* Dropdown Children */}
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "flex px-4 py-2 text-sm items-center justify-between"
                                            )}
                                        >
                                            HDB
                                            {/* Check Condition */}
                                            <CheckIcon
                                                className="-mr-1 h-5 w-5 txt-primary"
                                                aria-hidden="true" />
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "flex px-4 py-2 text-sm items-center justify-between"
                                            )}
                                        >
                                            Condo
                                            {/* Check Condition */}
                                            {/* <CheckIcon
                                                className="-mr-1 h-5 w-5 txt-primary"
                                                aria-hidden="true" /> */}
                                        </a>
                                    )}
                                </Menu.Item>
                            </Dropdown>
                            <Dropdown title="Room Type">
                                {/* Dropdown Children */}
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "flex px-4 py-2 text-sm items-center justify-between"
                                            )}
                                        >
                                            Common Room
                                            {/* Check Condition */}
                                            <CheckIcon
                                                className="-mr-1 h-5 w-5 txt-primary"
                                                aria-hidden="true" />
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "flex px-4 py-2 text-sm items-center justify-between"
                                            )}
                                        >
                                            Single Room
                                            {/* Check Condition */}
                                            {/* <CheckIcon
                                                className="-mr-1 h-5 w-5 txt-primary"
                                                aria-hidden="true" /> */}
                                        </a>
                                    )}
                                </Menu.Item>
                            </Dropdown>

                            <Dropdown title="Price">
                                {/* Dropdown Children */}
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            Low to High
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            High to Low
                                        </a>
                                    )}
                                </Menu.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 pb-12 border-b border-gray-200">

                    {/* 8 Column Section */}
                    <div className="sm:col-span-1 md:col-span-8">
                        <div className="grid grid-cols-1 gap-y-8">
                            {
                                properties.map((property, index) => (
                                    <CardProperties key={index} data={property} />
                                ))
                            }
                        </div>
                        {/* Pagination */}
                        <div className='w-full flex items-center justify-center mt-6'>
                            <nav className='bg-white isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination'>
                                {
                                    Array(totalPages).fill().map((_, index) => (
                                        <div key={index}>
                                            <div
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                                                    text-gray-900 ring-1 ring-inset ring-gray-300
                                                    focus:z-20 focus:outline-offset-0 hover:cursor-pointer hover:bg-gray-50
                                                    ${currentPage === index && 'bg-primary text-white ring-primary hover:bg-primary'}`}
                                                onClick={() => search(postType, index, searchKeyword)}>
                                                {index + 1}
                                            </div>
                                        </div>
                                    ))
                                }
                            </nav>
                        </div>
                    </div>

                    {/* 4 Column Section */}
                    <div className="hidden md:block sm:col-span-1 md:col-span-4 md:pl-8 md:border-l border-gray-300">
                        <div className="flex flex-col md:sticky md:top-32 p-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                        {subCategories.map((category) => (
                                            <li key={category.name}>
                                                <a href={category.href} className="block px-2 py-3">
                                                    {category.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </SearchLayout >
    );
};

export default ListingSearch;
