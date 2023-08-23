import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

/* Import Components */
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';

const ReportGenerateModal = ({ open, onClose }) => {

    const propertyReportHandler = (value) => {
        if (value !== "Select") {
            window.open(`${process.env.REACT_APP_API_URL}/api/property/export/${value}`, "_blank");
        }
    };

    const otherReportHandler = (value) => {
        if (value !== "Select") {
            window.open(`${process.env.REACT_APP_API_URL}/api/${value}`, "_blank");
        }
    };

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b">
                                    {/* Modal Header */}
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Generate Reports and CSV
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                            onClick={onClose}
                                        >
                                            <svg
                                                className="w-3 h-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 14"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Modal Body */}
                                <div className="flex flex-col px-4 py-3 sm:flex sm:px-6">
                                    <div className="flex flex-col gap-y-4">
                                        <div className="pb-4 border-b border-gray-200">
                                            <h2 className="text-xl font-semibold leading-9 tracking-tight text-gray-900">
                                                PDF Report
                                            </h2>
                                            <a
                                                href={`${process.env.REACT_APP_API_URL}/api/admin/export/report`}
                                                target="_blank"
                                                className="btn-primary w-60 inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                Space Share Users Report
                                            </a>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold leading-9 tracking-tight text-gray-900">
                                                CSV Reports
                                            </h2>
                                            <div className="py-2">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Property Reports
                                                </label>
                                                <div className="mt-2">
                                                    <select id="csvReport" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6 hover:cursor-pointer" onChange={(e) => propertyReportHandler(e.target.value)}>
                                                        <option selected>Select</option>
                                                        <option value="properties-by-room-rental">Properties by room rental</option>
                                                        <option value="properties-by-roommate">Properties by roommate</option>
                                                        <option value="properties-by-male-roommate">Properties by male roommate</option>
                                                        <option value="properties-by-female-roommate">Properties by female roommate</option>
                                                        <option value="properties-by-male-only-room-rental">Properties by male only room rental</option>
                                                        <option value="properties-by-female-only-room-rental">Properties by female only room rental</option>
                                                        <option value="properties-by-couple-only-room-rental">Properties by couple only room rental</option>
                                                        <option value="properties-by-room-rental-for-hdb">Properties by room rental for hdb</option>
                                                        <option value="properties-by-room-rental-for-landed">Properties by room rental for landed</option>
                                                        <option value="properties-by-roommate-finding-for-hdb">Properties by roommate finding for hdb</option>
                                                        <option value="properties-by-roommate-finding-for-condominium">Properties by roommate finding for condominium</option>
                                                        <option value="properties-by-roommate-finding-for-landed">Properties by roommate finding for landed</option>
                                                        <option value="properties-by-room-rental-for-singles">Properties by room rental for singles</option>
                                                        <option value="properties-by-room-rental-for-common">Properties by room rental for common</option>
                                                        <option value="properties-by-room-rental-for-master">Properties by room rental for master</option>
                                                        <option value="properties-by-room-rental-for-whole">Properties by room rental for whole</option>
                                                        <option value="properties-by-roommate-finding-for-singles">Properties by roommate finding for singles
                                                        </option>
                                                        <option value="properties-by-roommate-finding-for-common">Properties by roommate finding for common</option>
                                                        <option value="properties-by-roommate-finding-for-master">Properties by roommate finding for master</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="py-2">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                                    Other Reports
                                                </label>
                                                <div className="mt-2">
                                                    <select id="csvReport" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6 hover:cursor-pointer" onChange={(e) => otherReportHandler(e.target.value)}>
                                                        <option selected>Select</option>
                                                        <option value="renter/export/list">Renters Report</option>
                                                        <option value="tenant/export/list">Tenants Report</option>
                                                        <option value="amenity/export/list">Amenity Report</option>
                                                        <option value="facility/export/list">Facility Report</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Modal Footer */}
                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200">
                                    <ButtonOutlined onClick={onClose}>
                                        Cancel
                                    </ButtonOutlined>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ReportGenerateModal;
