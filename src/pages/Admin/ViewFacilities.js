import React, { useContext } from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';
import FormInputText from 'components/form/FormInputText';
import FormError from 'components/form/FormError';

import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Modal Import
import UpSertModal from 'components/Admin/Modal/UpSertModal';
import ConfirmModal from 'components/Admin/Modal/ConfirmModal';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import Axios from 'utils/Axios';
import { useNavigate } from 'react-router';
import AuthContext from 'contexts/AuthContext';

function ViewFacilities() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
    };

    /* Initialization */
    const initData = {
        facilityName: ''
    };
    const err = {};

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [formData, setFormData] = useState(initData);
    const [error, setError] = useState({});

    // Modal Methods
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedId, setId] = useState(null);
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
        Axios.get('/api/facility')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }

    /* Form Check Data Functions */
    const checkFacilityName = (facilityName) => {
        if (facilityName.length === 0) {
            err['facilityName'] = 'Facility Name must not be empty';
        }
    };

    const checkData = () => {
        checkFacilityName(formData['facilityName']);

        if (Object.keys(err).length !== 0) {
            setError(err);
            return false;
        } else {
            setError({});
            return true;
        }
    }

    /* Form send Data Functions */
    const createData = () => {
        if (checkData()) {
            Axios.post('/api/facility/create', formData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (response.status === 201) {
                        setCreateModalOpen(false);
                        fetchData();
                    } else {
                        alert(err.message);
                    }
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    alert(err.message);
                });
        }
    };

    const updateData = (id) => {
        setUpdateModalOpen(true);
        setId(id);
    };

    const sendUpdate = () => {
        if (checkData()) {
            Axios.put(`/api/facility/update/${selectedId}`, formData, {
                headers: { 'Content_Type': 'application/json' }
            })
                .then(response => {
                    if (response.status === 200) {
                        setUpdateModalOpen(false);
                        fetchData();
                    }
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    alert(err.message);
                });
        }
    }

    const deleteData = (id) => {
        setDeleteModalOpen(true);
        setId(id);
    };

    const sendDelete = () => {
        if (selectedId) {
            Axios.delete(`/api/facility/delete/${selectedId}`)
                .then(response => {
                    console.log("Deleted Data successfully");
                    setDeleteModalOpen(false);
                    fetchData();
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    alert(err.message);
                });
        }
        console.log(selectedId);
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Facility Name',
            selector: row => row.facilityName,
            sortable: true,
        },
        {
            name: 'Actions',
            selector: 'actions',
            cell: (row) => (
                <div className="w-full flex gap-1">
                    <ButtonOutlined
                        onClick={() => updateData(row.id)}
                    >
                        <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-500" aria-hidden="true" />
                        <span className="text-blue-500">Update</span>
                    </ButtonOutlined>
                    <ButtonOutlined
                        onClick={() => deleteData(row.id)}
                    >
                        <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                        <span className="text-red-500">Delete</span>
                    </ButtonOutlined>
                </div>
            )
        }
    ];

    return (
        <AdminLayout session={session}>
            <div className="flex justify-between mb-10">
                <Heading
                    title="All Facilities List"
                />
                <div>
                    <ButtonFilled
                        onClick={() => setCreateModalOpen(true)}
                    >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Create New Facility
                    </ButtonFilled>
                </div>
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

            <UpSertModal
                title="Update Facility"
                open={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                onSubmit={sendUpdate}
            >
                <FormInputText
                    label='Enter Facility Name'
                    autoFocus
                    value={formData['facilityName'] ? formData['facilityName'] : ''}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && sendUpdate()}
                />
                <FormError nbsp>{'facilityName' in error && error['facilityName']}</FormError>
            </UpSertModal>

            <UpSertModal
                title="Create Facility"
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={createData}
            >
                <FormInputText
                    label='Enter Facility Name'
                    autoFocus
                    value={formData['facilityName'] ? formData['facilityName'] : ''}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && createData()}
                />
                <FormError nbsp>{'facilityName' in error && error['facilityName']}</FormError>
            </UpSertModal>
        </AdminLayout>
    );
}

export default ViewFacilities;
