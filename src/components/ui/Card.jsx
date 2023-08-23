import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import UserIconWithTag from './UserIconWithTag';
import Badge from './Badge';
import ButtonFavorite from './ButtonFavorite';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Function Imports */
import formatPrettyDate from 'functions/formatPrettyDate';

/* Asset Imports */
import defaultImage from 'assets/images/default.jpeg';

function Card(props) {

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState();

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* Functions */
    const addToFavorite = (e) => {
        e.stopPropagation();

        if (!auth) {
            navigate('/login');
            return;
        }

        if (!isFavorite) {
            Axios.post('api/favourite/create',
                {
                    tenantId: auth?.id,
                    propertyId: props.data?.id
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => {
                    if (res.status === 201) {
                        setIsFavorite(true);
                    }
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setError(err.response.data);
                    }
                    else if (err.response.status === 500) {
                        setError(err.response.data);
                    }
                })
        }
        else {
            Axios.delete(`/api/favourite/delete?tenantId=${auth?.id}&propertyId=${props.data?.id}`)
                .then(res => {
                    if (res.status === 200) {
                        setIsFavorite(false);
                    }
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setError(err.response.data);
                    }
                    else if (err.response.status === 500) {
                        setError(err.response.data);
                    }
                })
        }
    };

    /* useEffect */
    useEffect(() => {
        if (props?.isFavorite) {
            setIsFavorite(true);
        }
    }, []);

    return (
        <div className="relative mx-auto w-full">
            <div className='relative inline-block duration-300 ease-in-out transition-transform
                transform hover:-translate-y-2 w-full h-full cursor-pointer'
                onClick={() => navigate(`/listing/${props.data?.id}`)}>
                <div className="flex flex-col shadow p-4 rounded-lg bg-white h-full">
                    <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                        <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full
                            d-flex align-items-center justify-content-center">
                            <img src={props.data?.propertyImages.length !== 0
                                ? props.data?.propertyImages[0]?.imageUrl
                                : defaultImage}
                                alt={props.data?.title}
                                className='w-full h-full object-content object-cover' />
                        </div>
                        <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 gap-2">
                            {
                                props.data?.approveStatus === 'PENDING' &&
                                <Badge status="warning">
                                    Pending
                                </Badge>
                            }
                            {
                                props.data?.approveStatus === 'APPROVED' &&
                                <Badge status="success">
                                    Approved
                                </Badge>
                            }
                            {
                                props.data?.approveStatus === 'DECLINED' &&
                                <Badge status="danger">
                                    Declined
                                </Badge>
                            }
                            {
                                props.data?.postType === 'ROOM_RENTAL' &&
                                <Badge status="primary">
                                    Room Rental
                                </Badge>
                            }
                            {
                                props.data?.postType === 'ROOMMATE_FINDING' &&
                                <Badge status="primary">
                                    Roommate
                                </Badge>
                            }
                        </span>
                        {
                            props?.userType !== 'renter' &&
                            <div className="absolute top-0 right-0 inline-flex mt-3 mr-3 w-9">
                                <ButtonFavorite status={isFavorite} handleClick={addToFavorite} />
                            </div>
                        }
                    </div>

                    <div className='mt-4'>
                        <h2 className='font-bold text-base md:text-lg text-gray-800 line-clamp-1'>
                            {props.data?.title}
                        </h2>
                        <p className='mt-2 text-sm text-gray-800 line-clamp-2'>
                            {`${props.data?.address}, ${props.data?.postalCode}`}
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-4 mt-4'>
                        <p className='text-s'>
                            {`Available on: ${props?.data?.availableOn && formatPrettyDate(props?.data.availableOn)}`}
                        </p>
                    </div>
                    <div className='grid grid-cols-2 gap-4 mt-4'>
                        <p className='text-green-500 font-bold'>
                            {`S$ ${props?.data?.rentalFees}`}
                        </p>
                    </div>
                    <div className='mt-auto'>
                        <UserIconWithTag
                            userId={props.data?.postType === 'ROOM_RENTAL'
                                ? props.data?.renter?.id
                                : props.data?.postType === 'ROOMMATE_FINDING' && props.data?.tenant?.id}
                            userType={props.data?.postType === 'ROOM_RENTAL'
                                ? 'renter'
                                : props.data?.postType === 'ROOMMATE_FINDING' && 'tenant'}
                            userPhotoUrl={props.data?.postType === 'ROOM_RENTAL'
                                ? props.data?.renter?.photoUrl
                                : props.data?.postType === 'ROOMMATE_FINDING' && props.data?.tenant?.photoUrl}
                            username={props.data?.postType === 'ROOM_RENTAL'
                                ? `${props.data?.renter?.firstName ? props.data?.renter.firstName : 'Unknown'} ${props.data?.renter?.lastName ? props.data?.renter.lastName : 'User'}`
                                : props.data?.postType === 'ROOMMATE_FINDING' && `${props.data?.tenant?.firstName ? props.data?.tenant.firstName : 'Unknown'} ${props.data?.tenant?.lastName ? props.data?.tenant.lastName : 'User'}`}>
                        </UserIconWithTag>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;