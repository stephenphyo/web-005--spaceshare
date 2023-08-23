import React, { useContext } from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Modal Import
import ConfirmModal from 'components/Admin/Modal/ConfirmModal';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import Axios from 'utils/Axios';
import { useNavigate } from 'react-router';
import AuthContext from 'contexts/AuthContext';

function ViewScamReports() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
    };

    // Mock Data
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Property Id',
            selector: row => row.propertyId,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Created At',
            selector: row => row.createdAt,
            sortable: true,
        },
        {
            name: 'Updated At',
            selector: row => row.updatedAt,
            sortable: true,
        },
        {
            name: 'Actions',
            selector: 'actions',
            cell: (row) => (
                <div className="w-full flex flex-col gap-1 py-2">
                    {row.approveStatus === 'PENDING' ? (
                        <>
                            <ButtonOutlined
                                onClick={() => approveData(row.id)}
                            >
                                <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-green-700" aria-hidden="true" />
                                <span className="text-green-700">Approve</span>
                            </ButtonOutlined>
                            <ButtonOutlined
                                onClick={() => declineData(row.id)}
                            >
                                <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                                <span className="text-red-500">Decline</span>
                            </ButtonOutlined>
                        </>
                    ) : row.approveStatus === 'APPROVED' ? (
                        <>
                            <ButtonOutlined
                                onClick={() => declineData(row.id)}
                            >
                                <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                                <span className="text-red-500">Decline</span>
                            </ButtonOutlined>
                        </>
                    ) : (
                        <>
                            <ButtonOutlined
                                onClick={() => approveData(row.id)}
                            >
                                <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-green-700" aria-hidden="true" />
                                <span className="text-green-700">Approve</span>
                            </ButtonOutlined>
                        </>
                    )}
                </div>
            )
        }
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
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
        Axios.get('api/admin/scamreport')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }

    // Modal Methods
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [declineModalOpen, setDeclineModalOpen] = useState(false);

    const [selectedId, setId] = useState(null);

    const approveData = (id) => {
        setApproveModalOpen(true);
        setId(id);
    };

    const sendApprove = () => {
        if (selectedId) {
            Axios.put(`/api/property/${selectedId}/approve`)
                .then(response => {
                    console.log("Approved Data successfully");
                    setApproveModalOpen(false);
                    fetchData();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    const declineData = (id) => {
        setDeclineModalOpen(true);
        setId(id);
    };

    const sendDecline = () => {
        if (selectedId) {
            Axios.put(`/api/property/${selectedId}/decline`)
                .then(response => {
                    console.log("Declined Data successfully");
                    setApproveModalOpen(false);
                    fetchData();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    return (
        <AdminLayout session={session}>
            <div className="mb-10">
                <Heading
                    title="All Scam Reports List"
                />
            </div>
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-12">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5">
                        {/* Card Content */}
                        <div className="w-full">

                            {/* Data Table */}
                            {loading ? (
                                <p>Loading......</p>
                            ) : (

                                <DataTableComponent
                                    columns={columns}
                                    data={data}
                                    pagination
                                />
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* Approve Modal */}
            <ConfirmModal
                action="approve"
                open={approveModalOpen}
                onClose={() => setApproveModalOpen(false)}
                title="Confirm Approval"
                confirmText="Approve"
                onConfirm={sendApprove}
            />

            {/* Decline Modal */}
            <ConfirmModal
                action="decline"
                open={declineModalOpen}
                onClose={() => setDeclineModalOpen(false)}
                title="Confirm Decline"
                confirmText="Decline"
                onConfirm={sendDecline}
            />

        </AdminLayout>
    );
}

export default ViewScamReports;
