import React, { useContext, useEffect, useState } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Report Generate Modal Import */
import ReportGenerateModal from 'components/Admin/Modal/ReportGenerateModal';
import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';
import AuthContext from 'contexts/AuthContext';

function Dashboard() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
    };

    const [propertyType, setPropertyType] = useState(null);
    const [scamreport, setScamReport] = useState(null);
    const [roomRentalByPropertyType, setRoomRentalByPropertyType] = useState(null);
    const [roomateFindingByPropertyType, setRoomateFindingByPropertyType] = useState(null);
    const [roomRentalByRoomType, setRoomRentalByRoomType] = useState(null);
    const [roommateFindingByRoomType, setRoommateFindingByRoomType] = useState(null);

    const [rendered, setRendered] = useState(false);

    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        setRendered(true);
    }, []);

    useEffect(() => {
        if (!rendered) return;

        if (!auth) navigate('/admin/login');
        else if (auth?.userType !== 'admin') {
            navigate('/403');
        }
    }, [rendered, auth]);

    useEffect(() => {
        fetchData();
    }, [rendered]);

    const fetchData = () => {
        Axios.get('/api/property/property-type-reports')
            .then(res => {
                setPropertyType(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            })

        Axios.get('/api/scamreport/status')
            .then(res => {
                setScamReport(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            })

        Axios.get('/api/property/room-rental/property-type/percentages')
            .then(res => {
                setRoomRentalByPropertyType(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            })

        Axios.get('/api/property/roommate-finding/property-type/percentages')
            .then(res => {
                setRoomateFindingByPropertyType(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            })

        Axios.get('/api/property/room-rental/room-type/percentages')
            .then(res => {
                setRoomRentalByRoomType(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            })

        Axios.get('/api/property/roommate-finding/room-type/percentages')
            .then(res => {
                setRoommateFindingByRoomType(res.data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            })
    };

    // Report Generator
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <AdminLayout session={session}>
            <div className="flex justify-between mb-10">
                <Heading
                    title="Dashboard"
                />
                <div>
                    <ButtonFilled
                        onClick={() => setModalOpen(true)}
                    >
                        <DocumentChartBarIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Generate Reports
                    </ButtonFilled>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-4">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Room Rental
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className='flex items-center justify-evenly gap-x-4'>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                            <span className='text-5xl font-semibold text-yellow-600'>
                                                {propertyType !== null ? propertyType['pendingRoomRentalCount'] : 0}
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-yellow-600'>
                                            Pending
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <span className='text-5xl font-semibold text-green-600'>
                                                {propertyType !== null ? propertyType['approvedRoomRentalCount'] : 0}
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-green-600'>
                                            Approved
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Roommate Findings
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className='flex items-center justify-evenly gap-x-4'>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                            <span className='text-5xl font-semibold text-yellow-600'>
                                                {propertyType !== null ? propertyType['pendingRoommateFindingCount'] : 0}
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-yellow-600'>
                                            Pending
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <span className='text-5xl font-semibold text-green-600'>
                                                {propertyType !== null ? propertyType['approvedRoommateFindingCount'] : 0}
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-green-600'>
                                            Approved
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Scam Reports
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                <div className='flex items-center justify-evenly gap-x-4'>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                                            <span className='text-5xl font-semibold text-yellow-600'>
                                                {scamreport !== null ? scamreport['pendingCount'] : 0}
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-yellow-600'>
                                            Pending
                                        </span>
                                    </div>
                                    <div>
                                        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <span className='text-5xl font-semibold text-green-600'>
                                                {scamreport !== null ? scamreport['approvedCount'] : 0}
                                            </span>
                                        </div>
                                        <span className='text-xl font-bold text-green-600'>
                                            Approved
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Average Room Rental By Property Type
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                {roomRentalByPropertyType ? (
                                    Object.keys(roomRentalByPropertyType).map(property => (
                                        <div key={property}>
                                            <div className="mb-1 text-sm font-medium">
                                                {property}
                                            </div>
                                            <div className="flex gap-x-2 items-center justify-between mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${roomRentalByPropertyType[property]}%` }}></div>
                                                </div>
                                                <div>
                                                    <span className='text-sm font-semibold'>
                                                        {roomRentalByPropertyType[property].toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No rental data available.</p>
                                )}
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Average Roommate Findings By Property Type
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                {roomateFindingByPropertyType ? (
                                    Object.keys(roomateFindingByPropertyType).map(property => (
                                        <div key={property}>
                                            <div className="mb-1 text-sm font-medium">
                                                {property}
                                            </div>
                                            <div className="flex gap-x-2 items-center justify-between mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${roomateFindingByPropertyType[property]}%` }}></div>
                                                </div>
                                                <div>
                                                    <span className='text-sm font-semibold'>
                                                        {roomateFindingByPropertyType[property].toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No data available yet.</p>
                                )}
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Average Room Rental By Room Type
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                {roomRentalByRoomType ? (
                                    Object.keys(roomRentalByRoomType).map(property => (
                                        <div key={property}>
                                            <div className="mb-1 text-sm font-medium">
                                                {property}
                                            </div>
                                            <div className="flex gap-x-2 items-center justify-between mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${roomRentalByRoomType[property]}%` }}></div>
                                                </div>
                                                <div>
                                                    <span className='text-sm font-semibold'>
                                                        {roomRentalByRoomType[property].toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No data available yet.</p>
                                )}
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5 h-full">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Average Roommate Findings By Room Type
                            </h3>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">
                            <div className="p-4 border border-gray-200 rounded-lg">
                                {roommateFindingByRoomType ? (
                                    Object.keys(roommateFindingByRoomType).map(property => (
                                        <div key={property}>
                                            <div className="mb-1 text-sm font-medium">
                                                {property}
                                            </div>
                                            <div className="flex gap-x-2 items-center justify-between mb-4">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${roommateFindingByRoomType[property]}%` }}></div>
                                                </div>
                                                <div>
                                                    <span className='text-sm font-semibold'>
                                                        {roommateFindingByRoomType[property].toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No data available yet.</p>
                                )}
                            </div>
                        </div>
                        {/* Card Footer */}
                    </div>
                </div>
            </div>

            {/* Report Generate Modal */}
            <ReportGenerateModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />

        </AdminLayout>
    );
}

export default Dashboard;
