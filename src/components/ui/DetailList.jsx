import React from 'react';
import DetailItem from './DetailItem';
import AttachmentItem from './AttachmentItem';

const DetailList = ({ title, data }) => {
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h2 className="text-xl font-semibold leading-7 text-gray-900">{title}</h2>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <DetailItem title="Room Area" content={data?.roomArea ? data.roomArea : 'Not Listed'} />
                    {
                        data?.roomType === 'WHOLE_UNIT' &&
                        <>
                            <DetailItem title="Number of Bedrooms" content={data?.numBedrooms ? data.numBedrooms : 'Not Listed'} />
                            <DetailItem title="Number of Bathrooms" content={data?.numBathrooms ? data.numBathrooms : 'Not Listed'} />
                        </>
                    }
                    {
                        data?.roomType !== 'WHOLE_UNIT' &&
                        <DetailItem title="Current Tenants" content={data?.numTenants ? data.numTenants : 'Not Listed'} />
                    }
                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                <AttachmentItem filename="proof_of_ownership.pdf" size="2.4mb" />
                                <AttachmentItem filename="other_files.zip" size="4.5mb" />
                            </ul>
                        </dd>
                    </div> */}
                </dl>
            </div>
        </div>
    );
};

export default DetailList;
