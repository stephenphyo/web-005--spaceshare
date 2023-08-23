import { React, Fragment } from 'react';
import { Link } from 'react-router-dom'; // Use the appropriate routing library
import { useNavigate } from 'react-router';

import { Dialog, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, PresentationChartLineIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dashboard } from '@mui/icons-material';

/* CSS Imports */
import './AdminLayout.css';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function AdminLayout({ session, children }) {

    /* useNavigate */
    const navigate = useNavigate();

    /* Functions */
    const logout = () => {
        sessionStorage.removeItem('auth');
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-primary w-[13.5rem] pb-6 flex flex-col fixed top-0 left-0 bottom-0 overflow-x-hidden overflow-y-hidden">
                <div className="flex items-center justify-center py-4 mx-auto">
                    <a href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/admin/dashboard');
                        }}>
                        <span className="sr-only">SpaceShare</span>
                        <img
                            className="h-8 w-32"
                            src="/spaceshare_logo_admin.svg"
                            alt="logo"
                        />
                    </a>
                </div>
                <hr className="mb-4 border-t border-white border-opacity-20" />
                <ul className="sidebar-list" role="list">
                    <div className='text-left px-4 text-white font-extrabold text-xs'>
                        Main Menu
                    </div>
                    <li>
                        <a
                            href='#'
                            className='flex items-center p-4 text-sm font-bold text-white hover:sidebar-link hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/dashboard');
                            }}
                        >
                            <PresentationChartLineIcon
                                className='h-6 w-5 mr-2'
                            />
                            <span>
                                Dashboard
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            className='flex items-center p-4 text-sm font-bold text-white hover:sidebar-link hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/scamreports');
                            }}
                        >
                            <PresentationChartLineIcon
                                className='h-6 w-5 mr-2'
                            />
                            <span>
                                View All Scam Reports
                            </span>
                        </a>
                    </li>
                    <hr className="mb-4 mx-4 border-t border-white border-opacity-20" />
                    <div className='text-left px-4 text-white font-extrabold text-xs'>
                        Property Menu
                    </div>
                    <li>
                        <a
                            href='#'
                            className='flex items-center p-4 text-sm font-bold text-white hover:sidebar-link hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/amenities');
                            }}
                        >
                            <PresentationChartLineIcon
                                className='h-6 w-5 mr-2'
                            />
                            <span>
                                View All Amenities
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            className='flex items-center p-4 text-sm font-bold text-white hover:sidebar-link hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/facilities');
                            }}
                        >
                            <PresentationChartLineIcon
                                className='h-6 w-5 mr-2'
                            />
                            <span>
                                View All Facilities
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            className='flex items-center p-4 text-sm font-bold text-white hover:sidebar-link hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/properties');
                            }}
                        >
                            <PresentationChartLineIcon
                                className='h-6 w-5 mr-2'
                            />
                            <span>
                                View All Properties
                            </span>
                        </a>
                    </li>
                    <hr className="mb-4 mx-4 border-t border-white border-opacity-20" />
                    <div className='text-left px-4 text-white font-extrabold text-xs'>
                        User Menu
                    </div>
                    <li>
                        <a
                            href='#'
                            className='flex items-center p-4 text-sm font-bold text-white hover:sidebar-link hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/adminlist');
                            }}
                        >
                            <PresentationChartLineIcon
                                className='h-6 w-5 mr-2'
                            />
                            <span>
                                View All Admins
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            className='flex items-center p-4 text-sm font-bold text-white hover:sidebar-link hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/tenants');
                            }}
                        >
                            <PresentationChartLineIcon
                                className='h-6 w-5 mr-2'
                            />
                            <span>
                                View All Tenants
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            className='flex items-center p-4 text-sm font-bold text-white hover:sidebar-link hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/renters');
                            }}
                        >
                            <PresentationChartLineIcon
                                className='h-6 w-5 mr-2'
                            />
                            <span>
                                View All Renters
                            </span>
                        </a>
                    </li>
                    <hr className="mb-4 mx-4 border-t border-white border-opacity-20" />
                </ul>
            </div >

            {/* Content Wrapper */}
            < div id="content-wrapper" className="flex flex-col w-full ml-[13.5rem]" >
                <div id="content" className="flex-grow">
                    {/* Topbar */}
                    <header className='bg-white border-b border-gray-200 sticky top-0'>
                        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
                                    style={{ userSelect: 'none' }}>
                                    <span className="text-sm font-medium text-gray-700">
                                        Admin Name
                                    </span>
                                </div>
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-10 w-10 rounded-full object-cover object-center"
                                                src="https://i.pinimg.com/originals/50/28/ce/5028ce929cd06b95691bd55db694a37b.jpg"
                                                alt="profile-img"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div className={classNames(active ? 'bg-gray-100 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        onClick={() => logout()}>
                                                        Logout
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </nav>
                    </header>
                    <div className="mx-auto max-w-7xl px-4 py-12 pt-8 sm:px-6 sm:py-24 sm:pt-16 lg:px-8">
                        {children}
                    </div>
                </div>
            </div >
        </div >
    );
}

export default AdminLayout;
