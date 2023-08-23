import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

/* Icon Imports */
import { CalendarIcon, HeartIcon, PencilIcon, UserCircleIcon } from '@heroicons/react/24/outline';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Component Imports */
import Layout from 'components/layout/Layout';
import Heading from 'components/ui/Heading';
import Badge from 'components/ui/Badge';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import FormInputText from 'components/form/FormInputText';
import FormInputDate from 'components/form/FormInputDate';
import FormError from 'components/form/FormError';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Asset Imports */
import avatar from 'assets/images/avatar.png';

/* Function Imports */
import formatPrettyDate from 'functions/formatPrettyDate';

/* Page Imports */
import NotFound404 from '../Error/NotFound404';

function Profile() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [rendered, setRendered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({});
    const [type, setType] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* useParams */
    const { user: paramUser, id: paramId } = useParams();

    /* useLocation */
    const location = useLocation();

    /* useEffect */
    useEffect(() => {
        setRendered(true);
    }, []);

    useEffect(() => {
        if (rendered) {
            if (location.pathname === '/profile') setType('self');
            if (location.pathname.startsWith('/profile/view')) setType('other');
        }
    }, [rendered, location]);

    useEffect(() => {
        if (rendered && !auth && type === 'self') navigate('/login');
    }, [rendered, auth, type]);

    useEffect(() => {
        if (type === 'self') {
            if (rendered && auth) {
                setData(auth);
            }
        }
        else if (type === 'other') {
            Axios.get(`/api/${paramUser}/${paramId}`,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            )
                .then(res => {
                    if (res.status === 200) {
                        setData(res.data);
                    }
                })
                .catch(err => {
                    if (err.response.status === 404 || err.response.status === 400) {
                        setError('404');
                    }
                    else if (err.response.status === 500) {
                        setError(err.response.data);
                    }
                });
        }
    }, [type, rendered, auth]);

    const saveProfile = () => {
        Axios.put(`/api/${auth?.userType}/update/${auth?.id}`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                    sessionStorage.setItem('auth', JSON.stringify({ ...res.data, userType: auth?.userType }));
                    window.location.reload();
                }
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setError(err.response.data);
                }
                else if (err.response.status === 500) {
                    setError(err.response.data);
                }
            });
    };

    if (error === '404' && rendered) {
        return <NotFound404 />
    }
    else {
        return (
            <Layout>
                <div className="mb-10">
                    <Heading title="Profile" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 rounded-lg p-8 py-0 border border-gray-300">

                    {/* 4 column section */}
                    <div className="sm:col-span-1 md:col-span-4 md:pr-8 md:border-r border-gray-300">
                        <div className="mx-auto max-w-xs flow-root pt-8">
                            <ul role="list" className="-my-6 divide-y divide-none">
                                <li className="py-2">
                                    <div className="relative inline-block w-full">
                                        <div className="relative aspect-square mt-4 pt-[100%]">
                                            <img
                                                className="absolute inset-0 w-full h-full object-cover object-center rounded-full"
                                                src={data?.photoUrl ? data.photoUrl : avatar}
                                                alt="profile-img"
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <p className="text-3xl font-normal text-gray-800 line-clamp-1">
                                        {
                                            type === 'self'
                                                ? `${auth?.firstName} ${auth?.lastName}`
                                                : type === 'other' && `${data?.firstName} ${data?.lastName}`
                                        }
                                    </p>
                                </li>
                                <li className="py-2">
                                    <div className="flex flex-col p-6 justify-between rounded-lg bg-white border border-gray-300">
                                        {
                                            type === 'self' &&
                                            <div>
                                                <p className="text-sm font-semibold mb-1 text-gray-900">
                                                    User Type:
                                                    <span className="ml-4 text-sm font-medium leading-6 text-gray-600">
                                                        {
                                                            auth?.userType === 'renter'
                                                                ? 'Renter' : auth?.userType === 'tenant' && 'Tenant'
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        }
                                        <div className='mt-2'>
                                            <p className="text-sm font-semibold mb-1 text-gray-900">
                                                Joined On:
                                                <span className="ml-4 text-sm font-medium leading-6 text-gray-600">
                                                    {
                                                        type === 'self'
                                                            ? auth?.createdAt && formatPrettyDate(auth?.createdAt)
                                                            : type === 'other' && data?.createdAt && formatPrettyDate(data?.createdAt)
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex mt-2">
                                            <p className="text-sm font-semibold mb-1 text-gray-900 mr-4">
                                                Account Status:
                                            </p>
                                            {
                                                type === 'self'
                                                    ? auth?.status === 'ACTIVE'
                                                        ? (
                                                            <Badge status="success">
                                                                Active
                                                            </Badge>
                                                        )
                                                        : auth?.status === 'INACTIVE' && (
                                                            <Badge status="danger">
                                                                Inactive
                                                            </Badge>
                                                        )
                                                    : data?.status === 'ACTIVE'
                                                        ? (
                                                            <Badge status="success">
                                                                Active
                                                            </Badge>
                                                        )
                                                        : data?.status === 'INACTIVE' && (
                                                            <Badge status="danger">
                                                                Inactive
                                                            </Badge>
                                                        )
                                            }
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 8 column section */}
                    <div className="sm:col-span-1 md:col-span-8 pt-8">
                        <section className="pb-5 border-b border-gray-200 mb-5">
                            <div className="flex items-center mb-4">
                                <UserCircleIcon className="-ml-0.5 mr-1.5 h-6 w-6" aria-hidden="true" />
                                <p className="text-xl font-semibold">
                                    User Detail
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 p-6 md:top-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                                <article className='col-span-1 md:col-span-10 gap-x-6 gap-y-8'>
                                    {!isEditing
                                        ? (
                                            <div>
                                                <div>
                                                    <div className="gap-x-6 gap-y-8">
                                                        <div className="flex flex-col gap-x-6 gap-y-8">
                                                            <div className="sm:col-span-4">
                                                                <FormInputText
                                                                    label='First Name'
                                                                    disabled
                                                                    value={data?.firstName ? data.firstName : ''}
                                                                />
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <FormInputText
                                                                    label='Last Name'
                                                                    disabled
                                                                    value={data?.lastName ? data.lastName : ''}
                                                                />
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <FormInputText
                                                                    label='Email'
                                                                    disabled
                                                                    value={data?.email ? data.email : ''}
                                                                />
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <FormInputText
                                                                    label='Phone'
                                                                    disabled
                                                                    value={data?.phone ? data.phone : ''}
                                                                />
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <FormInputText
                                                                    label='Address'
                                                                    disabled
                                                                    value={data?.address ? data.address : ''}
                                                                />
                                                            </div>
                                                            <div className="sm:col-span-4">
                                                                <FormInputText
                                                                    label='Date of Birth'
                                                                    disabled
                                                                    value={data?.dateOfBirth ? data.dateOfBirth : ''}
                                                                />
                                                                <FormError nbsp></FormError>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    type === 'self' &&
                                                    <div className="sm:col-span-3 flex gap-x-4 mb-4">
                                                        <ButtonFilled onClick={() => setIsEditing(true)} >
                                                            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-white" aria-hidden="true" />
                                                            Edit Profile
                                                        </ButtonFilled>
                                                    </div>
                                                }
                                            </div>
                                        )
                                        : (
                                            <div>
                                                <div>
                                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                                                        <div className="flex flex-col gap-x-6 gap-y-8">
                                                            <div className="col-span-1">
                                                                <FormInputText
                                                                    label='First Name'
                                                                    autoFocus
                                                                    value={data?.firstName ? data.firstName : ''}
                                                                    onChange={(e) => setData({ ...data, firstName: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="col-span-1">
                                                                <FormInputText
                                                                    label='Last Name'
                                                                    value={data?.lastName ? data.lastName : ''}
                                                                    onChange={(e) => setData({ ...data, lastName: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="col-span-1">
                                                                <FormInputText
                                                                    label='Email'
                                                                    disabled
                                                                    value={data?.email ? data.email : ''}
                                                                />
                                                            </div>
                                                            <div className="col-span-1">
                                                                <FormInputText
                                                                    label='Phone'
                                                                    value={data?.phone ? data.phone : ''}
                                                                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="col-span-1">
                                                                <FormInputText
                                                                    label='Address'
                                                                    value={data?.address ? data.address : ''}
                                                                    onChange={(e) => setData({ ...data, address: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="col-span-1">
                                                                <FormInputDate
                                                                    label='Date of Birth'
                                                                    value={data?.dateOfBirth ? data.dateOfBirth : ''}
                                                                    onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })}
                                                                />
                                                                <FormError nbsp></FormError>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col-reverse sm:flex-row gap-4 mb-4">
                                                    <ButtonOutlined onClick={() => setIsEditing(false)}>
                                                        Cancel
                                                    </ButtonOutlined>
                                                    <ButtonFilled onClick={saveProfile}>
                                                        Save Profile
                                                    </ButtonFilled>
                                                </div>
                                            </div>
                                        )
                                    }
                                </article >
                            </div >
                        </section >

                        {/* <section className="pb-5 border-b border-gray-200 mb-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center ">
                                    <HeartIcon className="-ml-0.5 mr-1.5 h-6 w-6" aria-hidden="true" />
                                    <p className="text-xl font-semibold">
                                        Favorites
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/favorite');
                                    }}
                                    className="text-sm font-semibold leading-6 txt-primary hover:txt-primary-hover mr-6"
                                >
                                    View All
                                    <span aria-hidden="true">

                                    </span>
                                </a>
                            </div>
                            <div className="flex flex-col py-6 md:top-6 max-h-96 overflow-y-auto rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full flex-grow">
                                    {properties.map((property, index) => (
                                        <CardFavorite
                                            key={index}
                                            title={property.title}
                                            propertyImgUrl={property.propertyImgUrl}
                                            description={property.description}
                                            location={property.location}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                        <section className="pb-5 mb-5">
                            <div className="flex items-center mb-4">
                                <CalendarIcon className="-ml-0.5 mr-1.5 h-6 w-6" aria-hidden="true" />
                                <p className="text-xl font-semibold">
                                    Appointments
                                </p>
                            </div>
                            <div className="flex flex-col py-6 md:top-6 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full flex-grow">
                                    <CardAppointment
                                        title="House Meeting"
                                        status={0}
                                        date="12/08/2023"
                                    >
                                    </CardAppointment>
                                    <CardAppointment
                                        title="Owner Meeting"
                                        status={2}
                                        date="08/08/2023"
                                    >
                                    </CardAppointment>
                                    <CardAppointment
                                        title="Room Tour"
                                        status={1}
                                        date="06/08/2023"
                                    >
                                    </CardAppointment>
                                </div>
                            </div>
                        </section> */}
                    </div>
                </div>
            </Layout>
        );
    }
};

export default Profile;
