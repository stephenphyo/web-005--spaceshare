import React from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Dropdown = ({ title, children }) => {
    return (
        <Menu as="div" className="w-full relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full items-center justify-between gap-x-1.5 max-h-[54px] rounded-md bg-white p-4 text-sm text-left font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {title}
                    <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-full md:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {children}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Dropdown;
