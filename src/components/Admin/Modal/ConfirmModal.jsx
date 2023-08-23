import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import ButtonFilled from 'components/ui/ButtonFilled'
import ButtonOutlined from 'components/ui/ButtonOutlined'

export default function ConfirmModal({ action, open, onClose, title, confirmText, onConfirm }) {
    
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
                            {/* Modal Body */}
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex flex-col items-center">
                                        {
                                            action === 'approve' ? (
                                                    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                                        <CheckCircleIcon className="h-14 w-14 text-green-600" aria-hidden="true" />
                                                    </div>
                                                ) : action === 'decline' ? (
                                                    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                                        <XCircleIcon className="h-14 w-14 text-red-600" aria-hidden="true" />
                                                    </div>
                                                ) : (
                                                    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                                                        <TrashIcon className="h-14 w-14 text-red-600" aria-hidden="true" />
                                                    </div>
                                                )
                                        }
                                        <div className="mt-3 text-center">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                {title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to {' '}
                                                    { action === 'approve' ? 'approve?' : action === 'decline' ? 'decline?' : 'delete?' }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Modal Footer */}
                                <div className="flex items-center bg-gray-50 px-4 py-3 space-x-2">
                                    <ButtonOutlined onClick={onClose}>
                                        Cancel
                                    </ButtonOutlined>
                                    {
                                        action === 'approve' ?
                                            <ButtonFilled onClick={onConfirm}>
                                                {confirmText}
                                            </ButtonFilled>
                                            :
                                            <button
                                                type="button"
                                                className="w-full inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-600 hover:bg-red-500"
                                                onClick={onConfirm}
                                            >
                                                {confirmText}
                                            </button>
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
