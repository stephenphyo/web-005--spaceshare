import React, { useContext } from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

import { TrashIcon } from '@heroicons/react/24/outline';

// Modal Import
import ConfirmModal from 'components/Admin/Modal/ConfirmModal';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import Axios from 'utils/Axios';
import { useNavigate } from 'react-router';
import AuthContext from 'contexts/AuthContext';

function ViewRenters() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
    };

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Renter Name',
            selector: row => row.firstName + ' ' + row.lastName,
            sortable: true,
        },
        {
            name: 'ID Number',
            selector: row => row.identificationNumber,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'DOB',
            selector: row => row.dateOfBirth,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Actions',
            selector: 'actions',
            cell: (row) => (
                <div className="w-full flex flex-col gap-1 py-2 min-w-[100px]">
                        { row.status === 'ACTIVE' ? (
                            <>
                                <ButtonOutlined
                                    onClick={() => deleteData(row.id)}
                                >
                                    <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                                    <span className="text-red-500">Delete</span>
                                </ButtonOutlined>
                            </>
                        ) : ''}
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
        Axios.get('/api/renter')
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
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedId, setId] = useState(null);

    const deleteData = (id) => {
        setDeleteModalOpen(true);
        setId(id);
    };

    const sendDelete = () => {
        if (selectedId) {
            Axios.delete(`/api/renter/delete/${selectedId}`)
                .then(response => {
                    console.log("Deleted Data successfully");
                    setDeleteModalOpen(false);
                    fetchData();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        console.log(selectedId);
    }

    return (
        <AdminLayout session={session}>
            <div className="mb-10">
                <Heading
                    title="All Renters List"
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

            {/* Reject Modal */}
            <ConfirmModal
                action="delete"
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Delete"
                confirmText="Delete"
                onConfirm={sendDelete}
            />

        </AdminLayout>
    );
}

export default ViewRenters;
