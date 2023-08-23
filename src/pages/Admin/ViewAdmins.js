import React, { useContext } from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';
import FormInputText from 'components/form/FormInputText';
import FormInputPassword from 'components/form/FormInputPassword';
import FormError from 'components/form/FormError';

import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Modal Import
import UpSertModal from 'components/Admin/Modal/UpSertModal';
import ConfirmModal from 'components/Admin/Modal/ConfirmModal';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import Axios from 'utils/Axios';

/* Function Imports */
import validateEmail from 'functions/validateEmail';
import validatePassword from 'functions/validatePassword';
import { useNavigate } from 'react-router';
import AuthContext from 'contexts/AuthContext';

function ViewAdmins() {
    const session = {
        role: 'admin',
        userId: '123',
        username: 'John Doe'
    };

    /* Initialization */
    const initData = {
        email: '', password: '', cfmPassword: ''
    };
    const err = {};

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [formData, setFormData] = useState(initData);
    const [error, setError] = useState({});

    /* Modal Call Functions */
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
        Axios.get('/api/admin')
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
    const checkEmail = (email) => {
        if (email.length === 0) {
            err['email'] = 'Email address must not be empty';
        }
        else if (!validateEmail(email)) {
            err['email'] = 'Enter a valid email address';
        }
    };

    const checkPassword = (password, cfmPassword) => {
        if (password.length === 0) {
            err['password'] = 'Password must not be empty';
        }
        else if (password.length < 8 || password.length > 24) {
            err['password'] = 'Password must be 8-24 characters';
        }
        else if (!validatePassword(formData['password'])) {
            err['password'] = 'Password must contain at least one uppercase, lowercase, number and special character';
        }
        else if (password !== cfmPassword) {
            err['cfmPassword'] = 'Passwords do not match';
        }
    };

    const checkData = () => {
        checkEmail(formData['email']);
        checkPassword(formData['password'], formData['cfmPassword']);

        if (Object.keys(err).length !== 0) {
            setError(err);
            return false;
        } else {
            setError({});
            delete formData['cfmPassword'];
            return true;
        }
    }

    const updatePassword = () => {
        checkPassword(formData['password'], formData['cfmPassword']);

        if (Object.keys(err).length !== 0) {
            setError(err);
            return false;
        } else {
            setError({});
            delete formData['cfmPassword'];
            return true;
        }
    }

    /* Form send Data Functions */
    const createData = () => {
        if (checkData()) {
            Axios.post('/api/admin/create', formData, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    if (response.status === 201) {
                        setCreateModalOpen(false);
                        fetchData();
                    }
                })
                .catch(err => {
                    console.error('Error creating data:', err);
                    alert(err.message);
                });
        }
    };

    const updateData = (id) => {
        setUpdateModalOpen(true);
        setId(id);
    };

    const sendUpdate = () => {
        if (updatePassword()) {
            Axios.put(`/api/admin/update_password/${selectedId}`, formData, {
                headers: { 'Content_Type': 'application/json' }
            })
                .then(response => {
                    if (response.status === 200) {
                        setUpdateModalOpen(false);
                        fetchData();
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
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
            Axios.delete(`/api/admin/delete/${selectedId}`)
                .then(response => {
                    console.log("Deleted Data successfully");
                    setDeleteModalOpen(false);
                    fetchData();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    // Mock Data
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
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
                    title="All Admins List"
                />
                <div>
                    <ButtonFilled
                        onClick={() => setCreateModalOpen(true)}
                    >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Add New Admin
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
                title="Update Password"
                open={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
                onSubmit={sendUpdate}
            >
                <FormInputPassword
                    label='Enter New Password'
                    value={formData['password']}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && createData()}
                />
                <FormError nbsp>{'password' in error && error['password']}</FormError>
                <FormInputPassword
                    label='Confirm New Password'
                    value={formData['cfmPassword']}
                    onChange={(e) => setFormData({ ...formData, cfmPassword: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && createData()}
                />
                <FormError nbsp>{'cfmPassword' in error && error['cfmPassword']}</FormError>
            </UpSertModal>

            <UpSertModal
                title="Create Admin"
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={createData}
            >
                <FormInputText
                    label='Enter Username'
                    autoFocus
                    value={formData['email'] ? formData['email'] : ''}
                    onChange={(e) => setFormData({ ...formData, email: (e.target.value).toLowerCase() })}
                    onKeyPress={(e) => e.key === 'Enter' && createData()}
                />
                <FormError nbsp>{'email' in error && error['email']}</FormError>
                <FormInputPassword
                    label='Enter Password'
                    value={formData['password']}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && createData()}
                />
                <FormError nbsp>{'password' in error && error['password']}</FormError>
                <FormInputPassword
                    label='Confirm Password'
                    value={formData['cfmPassword']}
                    onChange={(e) => setFormData({ ...formData, cfmPassword: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && createData()}
                />
                <FormError nbsp>{'cfmPassword' in error && error['cfmPassword']}</FormError>
            </UpSertModal>

        </AdminLayout>
    );
}

export default ViewAdmins;
