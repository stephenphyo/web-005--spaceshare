import { Fragment, useContext, useState } from 'react'
import { useNavigate } from 'react-router';

import { Dialog, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Asset Imports */
import avatar from 'assets/images/avatar.png';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
};

function Header() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [open, setOpen] = useState(false);

    /* useContext */
    const { auth, setAuth } = useContext(AuthContext);

    /* Functions */
    const logout = () => {
        sessionStorage.removeItem('auth');
        setAuth(null);
    };

    return (
        <header className='bg-white shadow-md border-b border-gray-200 sticky top-0 z-50 select-none'>
            <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-0 lg:px-1">
                <div>
                    <div className="flex h-16 items-center">

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <div className='cursor-pointer'
                                onClick={() => navigate('/')}>
                                <span className="sr-only">SpaceShare</span>
                                <img className="h-8 w-32"
                                    src="/spaceshare_logo.svg" alt="logo" />
                            </div>
                        </div>

                        <div className="ml-auto flex items-center">

                            {/* Login/Register Options */}
                            {!auth &&
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <div
                                        className="text-sm font-medium text-gray-700 hover:txt-primary btn cursor-pointer"
                                        onClick={() => { navigate('/login') }}>
                                        Login
                                    </div>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    <div
                                        className="text-sm font-medium text-gray-700 hover:txt-primary btn cursor-pointer"
                                        onClick={() => { navigate('/register') }}>
                                        Register Account
                                    </div>
                                </div>
                            }

                            {/* Username */}
                            {auth &&
                                <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6"
                                    style={{ userSelect: 'none' }}>
                                    <span className="text-sm font-medium text-gray-700">
                                        {auth?.firstName} {auth?.lastName}
                                    </span>
                                </div>
                            }

                            {/* Profile Dropdown */}
                            {auth &&
                                <Menu as="div" className="relative ml-3 hidden md:block z-[100]">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-10 w-10 rounded-full object-cover object-center"
                                                src={auth?.photoUrl ? auth.photoUrl : avatar} alt="profile-img"
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
                                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                                        onClick={() => navigate('/profile')}>
                                                        View Profile
                                                    </div>
                                                )}
                                            </Menu.Item>
                                            {
                                                auth?.userType === 'tenant'
                                                    ?
                                                    <>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <div onClick={(e) => { navigate('/tenant/listing/create') }}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                                                    Create New Finding
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <div onClick={(e) => { navigate('/tenant/properties') }}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                                                    My Findings
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <div onClick={(e) => { navigate('/tenant/favorites') }}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                                                    My Favorites
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <div onClick={(e) => { navigate('/tenant/recents') }}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                                                    My Recent Searches
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                                    :
                                                    <>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <div onClick={(e) => { navigate('/renter/listing/create') }}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                                                    Create New Rental
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <div onClick={(e) => { navigate('/renter/properties') }}
                                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}>
                                                                    My Rentals
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                            }
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
                            }

                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 md:hidden"
                                onClick={() => setOpen(true)}>
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                {open ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar Transition */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-[100]" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full">
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Menu</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}>
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    {!auth &&
                                                        <div className="flex flex-col rounded-lg border border-gray-200">
                                                            <div
                                                                className="text-gray-700 hover:bg-gray-200 hover:text-white px-4 py-2 text-base font-medium border-b border-gray-200 hover:cursor-pointer"
                                                                onClick={(e) => { navigate('/login') }}
                                                            >
                                                                Login
                                                            </div>
                                                            <div
                                                                className="text-gray-700 hover:bg-gray-200 hover:text-white px-4 py-2 text-base font-medium hover:cursor-pointer"
                                                                onClick={(e) => { navigate('/register') }}
                                                            >
                                                                Register Account
                                                            </div>
                                                        </div>
                                                    }
                                                    {auth &&
                                                        <div className="flow-root">
                                                            <div className="flex items-center gap-x-6 pb-6 mb-6 border-b border-gray-200">
                                                                <img className="h-16 w-16 rounded-full object-cover object-center" src={auth?.photoUrl ? auth.photoUrl : avatar} alt="" />
                                                                <div>
                                                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{auth?.firstName} {auth?.lastName}</h3>
                                                                    <p className="text-sm font-semibold leading-6 txt-primary">
                                                                        {
                                                                            auth?.status === 'ACTIVE'
                                                                                ? (
                                                                                    <span className='txt-primary'>
                                                                                        Active
                                                                                    </span>
                                                                                )
                                                                                : auth?.status === 'INACTIVE' && (
                                                                                    <span className='text-red-600'>
                                                                                        Inactive
                                                                                    </span>
                                                                                )
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="ml-auto">
                                                                    <div
                                                                        className="inline-flex items-center justify-center rounded-md border border-transparent btn-primary px-5 py-2.5 text-base font-sm text-white shadow-sm cursor-pointer"
                                                                        onClick={() => navigate('/profile')}>
                                                                        Edit
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col rounded-lg border border-gray-200">
                                                                {
                                                                    auth?.userType === 'tenant'
                                                                        ?
                                                                        <>
                                                                            <div
                                                                                className="text-gray-700 hover:bg-gray-200 hover:text-white px-4 py-2 text-base font-medium border-b border-gray-200 hover:cursor-pointer"
                                                                                onClick={(e) => { navigate('/tenant/listing/create') }}>
                                                                                Create New Finding
                                                                            </div>
                                                                            <div
                                                                                className="text-gray-700 hover:bg-gray-200 hover:text-white px-4 py-2 text-base font-medium border-b border-gray-200 hover:cursor-pointer"
                                                                                onClick={(e) => { navigate('/renter/properties') }}>
                                                                                My Findings
                                                                            </div>
                                                                            <div
                                                                                className="text-gray-700 hover:bg-gray-200 hover:text-white px-4 py-2 text-base font-medium border-b border-gray-200 hover:cursor-pointer"
                                                                                onClick={(e) => { navigate('/tenant/favorites') }}>
                                                                                My Favorites
                                                                            </div>
                                                                        </>
                                                                        : auth?.userType === 'renter' &&
                                                                        <>
                                                                            <div
                                                                                className="text-gray-700 hover:bg-gray-200 hover:text-white px-4 py-2 text-base font-medium border-b border-gray-200 hover:cursor-pointer"
                                                                                onClick={(e) => { navigate('/renter/listing/create') }}>
                                                                                Create New Rental
                                                                            </div>
                                                                            <div
                                                                                className="text-gray-700 hover:bg-gray-200 hover:text-white px-4 py-2 text-base font-medium border-b border-gray-200 hover:cursor-pointer"
                                                                                onClick={(e) => { navigate('/renter/properties') }}>
                                                                                My Rentals
                                                                            </div>
                                                                        </>
                                                                }
                                                                <div
                                                                    className="text-gray-700 hover:bg-gray-200 hover:text-white px-4 py-2 text-base font-medium hover:cursor-pointer"
                                                                    onClick={() => logout()}>
                                                                    Logout
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog >
            </Transition.Root >
        </header >
    );
}

export default Header;