import React from 'react';
import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

function PropertyDetail() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
    };

    return (
        <AdminLayout session={session}>
            <div className="mb-10">
                <Heading
                    title="Property Detail"
                />
            </div>
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-12">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Some data Some data
                            </h3>
                            <span className="font-normal text-base text-gray-500">
                                Some more data Some more data
                            </span>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="h-80 bg-slate-50 border border-dashed border-gray-400 rounded-lg">

                            </div>
                        </div>
                        {/* Card Footer */}
                        <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
                            <div className="ml-auto w-36">
                                <ButtonFilled>
                                    View
                                </ButtonFilled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}

export default PropertyDetail;
