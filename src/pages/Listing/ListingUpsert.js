import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

/* Component Imports */
import FormInputText from 'components/form/FormInputText';
import FormInputNumber from 'components/form/FormInputNumber';
import FormError from 'components/form/FormError';
import ButtonFilled from 'components/ui/ButtonFilled';
import FormRadioOption from 'components/form/FormRadioOption';
import FormSelectOption from 'components/form/FormSelectOption';
import ImageSelector from 'components/ImageSelector/ImageSelector';
import FileSelector from 'components/FileSelector/FileSelector';
import Heading from 'components/ui/Heading';
import FormInputDate from 'components/form/FormInputDate';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Service Imports */
import { firebaseStorageRefs } from 'services/firebase/CloudStorage/firebaseCloudStorage';
import { uploadFiles, uploadFilesUUID } from 'services/firebase/CloudStorage/firebaseStorageUploadFiles'
import firebaseStorageDeleteFiles from 'services/firebase/CloudStorage/firebaseStorageDeleteFiles';
import Loader from 'components/Loader/Loader';
import { useContext } from 'react';
import AuthChecker from 'components/layout/AuthChecker';
import Layout from 'components/layout/Layout';

/* Page Imports */
import NotFound404 from 'pages/Error/NotFound404';

/* Icon Imports */
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ButtonOutlined from 'components/ui/ButtonOutlined';

function ListingUpsert() {

    /* Initialization */
    const allowedPaths = ['create', 'update'];

    const initData = {
        title: '', description: '', propertyType: '', roomType: '',
        rentalFees: 0, address: '', postalCode: '', furnishment: '',
        nearbyDesc: '', availableOn: '',
        numBedrooms: 0, numBathrooms: 0, numTenants: 0,
        propertyImageURLs: [], tenantType: '', amenities: [],
        facilities: [], postType: ''
    };
    const err = {};

    /* useState */
    const [rendered, setRendered] = useState(false);
    const [data, setData] = useState(initData);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [existingDocs, setExistingDocs] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [existingAmenities, setExistingAmenities] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [existingFacilities, setExistingFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);

    const [toggleAmenity, setToggleAmenity] = useState(false);
    const [toggleFacility, setToggleFacility] = useState(false);

    /* useNavigate */
    const navigate = useNavigate();

    /* useParams */
    const { upsert: paramUpsert, user: paramUser } = useParams();

    /* useLocation */
    const location = useLocation();

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* Search Params */
    const searchParams = new URLSearchParams(location.search);
    const propertyId = searchParams.get('id');

    /* Functions */
    const checkTitle = (title) => {
        if (title.length === 0) {
            err['title'] = 'Title of Property Post must not be empty'
        }
    };

    const checkRentalFees = (rentalFees) => {
        if (rentalFees < 100) {
            err['rentalFees'] = 'Minimum Rental Fees must be greater than 100'
        }
    };

    const checkAddress = (address) => {
        if (address.length === 0) {
            err['address'] = 'Property Address must not be empty'
        }
    };

    const checkPostalCode = (postalCode) => {
        const regexPostalCode = /^[0-9]{6}$/;
        if (!regexPostalCode.test(postalCode)) {
            err['postalCode'] = 'Please enter valid postal code'
        }
        else if (postalCode.length === 0) {
            err['postalCode'] = 'Postal Code must not be empty'
        }
    };

    const checkOthers = () => {
        if (data['propertyType'].length === 0) {
            err['propertyType'] = 'Please select Property Type'
        }
        if (data['roomType'].length === 0) {
            err['roomType'] = 'Please select Room Type'
        }
        if (data['furnishment'].length === 0) {
            err['furnishment'] = 'Please select Furnishment Status'
        }
        if (!data['tenantType']) {
            err['tenantType'] = 'Please select Tenant Type'
        }
        if (selectedAmenities.length + existingAmenities.length === 0) {
            err['amenities'] = 'Please select at least one Amenity'
        }
        if (selectedFacilities.length + existingFacilities.length === 0) {
            err['facilities'] = 'Please select at least one Facility'
        }
        if (data['roomType'] === 'WHOLE_UNIT' && data['numBedrooms'] === 0) {
            err['numBedrooms'] = 'Number of Bedrooms must be greater than 0'
        }
        if (data['roomType'] === 'WHOLE_UNIT' && data['numBathrooms'] === 0) {
            err['numBathrooms'] = 'Number of Bathrooms must be greater than 0'
        }
        if (data['roomType'] === 'WHOLE_UNIT' && data['numTenants'] === 0) {
            err['numTenants'] = 'Number of Tenants must be greater than 0'
        }
        if (!data['availableOn']) {
            err['availableOn'] = 'Please select Availability Date'
        }
        if (selectedImages.length + existingImages.length === 0) {
            err['propertyImages'] = 'Please provide at least one Property Image'
        }
        if (paramUser === 'renter' && selectedDocs.length + existingDocs.length === 0) {
            err['propertyDocs'] = 'Please provide at least one Property Document'
        }
    };

    const checkData = () => {
        checkTitle(data['title']);
        checkRentalFees(data['rentalFees']);
        checkAddress(data['address']);
        checkPostalCode(data['postalCode']);
        checkOthers();

        if (Object.keys(err).length == 0) {
            setError({});
            return true;
        }
        else {
            setError(err);
            return false;
        }
    };

    const get = (propertyId) => {
        setLoading(true);
        Axios.get(`/api/property/${propertyId}`)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                    setSelectedImages(res.data?.propertyImages);
                    setSelectedDocs(res.data?.propertyDocs);
                    setSelectedAmenities(
                        res.data?.propertyAmenities.map(item => {
                            return item.amenity.id;
                        }))
                    setSelectedFacilities(
                        res.data?.propertyFacilities.map(item => {
                            return item.facility.id;
                        }))
                }
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setError(err.response.data);
                }
                else if (err.response.status === 500) {
                    setError(err.response.data);
                }
                setLoading(false);
            })
    };

    const create = async () => {
        try {
            // Upload Images to Firebase Storage
            const uploadedImageURLs = await uploadFilesUUID(
                firebaseStorageRefs.propertyImages, selectedImages);

            // Upload Files to Firebase Storage
            const uploadedFileURLs = await uploadFiles(
                firebaseStorageRefs.propertyDocs, selectedDocs);

            // Update the Data Object with the Uploaded Image URLs
            const updatedData = {
                ...data,
                postType: paramUser === 'tenant'
                    ? 'ROOMMATE_FINDING'
                    : paramUser === 'renter' && 'ROOM_RENTAL',
                propertyImageURLs: uploadedImageURLs,
                propertyDocURLs: uploadedFileURLs,
                propertyAmenityIDs: selectedAmenities,
                propertyFacilityIDs: selectedFacilities,
            };

            await Axios.post(`/api/${paramUser}/${auth?.id}/property/create`,
                updatedData,
                { headers: { 'Content-Type': 'application/json' } }
            )
                .then(res => {
                    if (res.status === 201) {
                        setData(res.data);
                        navigate(`/${paramUser}/properties`)
                    }
                    setLoading(false);
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setError(err.response.data);
                    }
                    else if (err.response.status === 500) {
                        setError(err.response.data);
                    }
                    setLoading(false);
                });
        }
        catch (error) {
            console.error("Error creating property:", error);
        }
    };

    const update = async () => {
        // Axios.put(`/api/property/update/${propertyId}`)
        //     .then(res => {
        //         if (res.status === 200) {
        //             setData(res.data);
        //         }
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         if (err.response.status === 404) {
        //             setError(err.response.data);
        //         }
        //         else if (err.response.status === 500) {
        //             setError(err.response.data);
        //         }
        //         setLoading(false);
        //     })
        try {
            // Upload Images to Firebase Storage
            let uploadedImageURLs = [];
            console.log(selectedImages);
            if (selectedImages.length !== 0) {
                uploadedImageURLs = await uploadFilesUUID(
                    firebaseStorageRefs.propertyImages, selectedImages);
            }

            // Upload Files to Firebase Storage
            const uploadedFileURLs = await uploadFiles(
                firebaseStorageRefs.propertyDocs, selectedDocs);

            // Update the Data Object with the Uploaded Image URLs
            const updatedData = {
                ...data,
                postType: paramUser === 'tenant'
                    ? 'ROOMMATE_FINDING'
                    : paramUser === 'renter' && 'ROOM_RENTAL',
                propertyImageURLs: uploadedImageURLs,
                propertyDocURLs: uploadedFileURLs,
                propertyAmenityIDs: selectedAmenities,
                propertyFacilityIDs: selectedFacilities
            };

            console.log('Update')

            await Axios.put(`/api/${paramUser}/${auth?.id}/property/update/${propertyId}`,
                updatedData,
                { headers: { 'Content-Type': 'application/json' } }
            )
                .then(res => {
                    if (res.status === 201) {
                        setData(res.data);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setError(err.response.data);
                    }
                    else if (err.response.status === 500) {
                        setError(err.response.data);
                    }
                    setLoading(false);
                });
        }
        catch (error) {
            console.error("Error updating property:", error);
        }
    };

    const submit = () => {
        if (checkData()) {

            if (paramUpsert === 'create') {
                create();
            }
            else if (paramUpsert === 'update') {
                update();
            }
        }
    };

    /* useEffect */
    useEffect(() => {
        setRendered(true);
    }, []);

    useEffect(() => {
        if (paramUpsert === 'create') {
            setData(initData);
        }
        else if (paramUpsert === 'update') {
            get(propertyId);
        }
    }, [paramUpsert]);

    useEffect(() => {
        if (!rendered) return;

        Axios.get('api/amenity/')
            .then(res => {
                if (res.status === 200) {
                    setAmenities(res.data);
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setError(err.response.data);
                }
            })
    }, [rendered]);

    useEffect(() => {
        if (!rendered) return;

        Axios.get('api/facility/')
            .then(res => {
                if (res.status === 200) {
                    setFacilities(res.data);
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setError(err.response.data);
                }
            })
    }, [rendered]);

    useEffect(() => {
        if (rendered && !auth) navigate('/');
    }, [rendered, auth]);

    if (!allowedPaths.includes(paramUpsert)) {
        return <NotFound404 />
    }
    else {
        return (
            <AuthChecker>
                <Layout>
                    {loading && <Loader />}
                    <Heading
                        title={
                            paramUser === 'renter'
                                ? paramUpsert === 'create'
                                    ? 'Create a New Rental Property'
                                    : 'Update Rental Property'
                                : paramUser === 'tenant'
                                    && paramUser === 'tenant' && paramUpsert === 'create'
                                    ? 'Create a New Roommate Finding'
                                    : 'Update Roommate Finding'
                        }
                    />

                    <div className="grid grid-cols-12 p-8 my-12 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                        <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-y-4">
                            <div className="col-span-1 md:col-span-12">
                                <FormInputText
                                    label='Enter Title of Property Post'
                                    autoFocus
                                    value={data['title']}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' && submit()}
                                />
                                <FormError nbsp>{error?.title}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <FormRadioOption
                                    name='Property Type'
                                    options={{ 'HDB': 'HDB', 'Condominium': 'CONDOMINIUM', 'Landed': 'LANDED' }}
                                    selected={data['propertyType']}
                                    setSelected={(e) => setData({ ...data, propertyType: e.target.value })} />
                                <FormError nbsp>{error?.propertyType}</FormError>
                            </div>


                            <div className="col-span-1 md:col-span-12">
                                <FormRadioOption
                                    name='Room Type'
                                    options={auth?.userType === 'renter' ? { 'Single': 'SINGLE', 'Common': 'COMMON', 'Master': 'MASTER', 'Whole Unit': 'WHOLE_UNIT' } : { 'Single': 'SINGLE', 'Common': 'COMMON', 'Master': 'MASTER' }}
                                    selected={data['roomType']}
                                    setSelected={(e) => setData({ ...data, roomType: e.target.value })} />
                                <FormError nbsp>{error?.roomType}</FormError>
                            </div>


                            <div className="col-span-1 md:col-span-6 md:mr-4">
                                <FormInputNumber
                                    label='Enter Rental Fees'
                                    value={data['rentalFees']}
                                    min='0'
                                    step='50'
                                    onChange={(e) => setData({ ...data, rentalFees: e.target.value })} />
                                <FormError nbsp>{error?.rentalFees}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-6">
                                <FormInputDate
                                    label='Available On'
                                    value={data['availableOn']}
                                    onChange={(e) => setData({ ...data, availableOn: e.target.value })} />
                                <FormError nbsp>{error?.availableOn}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <FormInputText
                                    label='Enter Property Address'
                                    value={data['address']}
                                    onChange={(e) => setData({ ...data, address: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' && submit()}
                                />
                                <FormError nbsp>{error?.address}</FormError>
                            </div>


                            <div className="col-span-1 md:col-span-4">
                                <FormInputText
                                    label='Enter Postal Code'
                                    value={data['postalCode']}
                                    maxLength='6'
                                    onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' && submit()}
                                />
                                <FormError nbsp>{error?.postalCode}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <label htmlFor="nearby" className='block text-sm font-medium leading-6 text-gray-900'>
                                    Nearby Description
                                </label>
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                                    <textarea
                                        rows="6"
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                        value={data?.nearbyDesc}
                                        onChange={(e) => setData({ ...data, nearbyDesc: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <FormRadioOption
                                    name='Property Furnishment'
                                    options={{ 'Furnished': 'FURNISHED', 'Partial': 'PARTIAL_FURNISHED', 'Unfurnished': 'UNFURNISHED' }}
                                    selected={data['furnishment'] ? data['furnishment'] : ''}
                                    setSelected={(e) => setData({ ...data, furnishment: e.target.value })} />
                                <FormError nbsp>{error?.furnishment}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <FormRadioOption
                                    name='Tenant Type'
                                    options={auth?.userType === 'renter'
                                        ? { 'Male': 'MALE', 'Female': 'FEMALE', 'Couple': 'COUPLE', 'Family': 'FAMILY' }
                                        : { 'Male': 'MALE', 'Female': 'FEMALE' }}
                                    selected={data['tenantType'] ? data['tenantType'] : ''}
                                    setSelected={(e) => setData({ ...data, tenantType: e.target.value })} />
                                <FormError nbsp>{error?.tenantType}</FormError>
                            </div>

                            {
                                data?.roomType === 'WHOLE_UNIT' &&
                                <>
                                    <div className="col-span-1 md:col-span-12">
                                        <FormSelectOption
                                            name='Number of Bedrooms'
                                            options={{ 'default': 'Select Number of Bedrooms', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' }}
                                            selected={data['numBedrooms'] ? data['numBedrooms'] : ''}
                                            setSelected={(e) => setData({ ...data, numBedrooms: e.target.value })} />
                                    </div>
                                    <FormError nbsp>{error?.numBedrooms}</FormError>
                                </>
                            }

                            {
                                data?.roomType === 'WHOLE_UNIT' &&
                                <>
                                    <div className="col-span-1 md:col-span-12">
                                        <FormSelectOption
                                            name='Number of Bathrooms'
                                            options={{ 'default': 'Select Number of Bathrooms', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' }}
                                            selected={data['numBathrooms'] ? data['numBathrooms'] : ''}
                                            setSelected={(e) => setData({ ...data, numBathrooms: e.target.value })} />
                                    </div>
                                    <FormError nbsp>{error?.numBathrooms}</FormError>
                                </>
                            }

                            {
                                data?.roomType === 'WHOLE_UNIT' &&
                                <>
                                    <div className="col-span-1 md:col-span-12">
                                        <FormSelectOption
                                            name='Number of Tenants'
                                            options={{ 'default': 'Select Number of Tenants', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6' }}
                                            selected={data['numTenants'] ? data['numTenants'] : ''}
                                            setSelected={(e) => setData({ ...data, numTenants: e.target.value })} />
                                    </div>
                                    <FormError nbsp>{error?.numTenants}</FormError>
                                </>
                            }

                            <div className="col-span-1 md:col-span-12">
                                <ImageSelector
                                    selectedImages={selectedImages}
                                    setSelectedImages={setSelectedImages}
                                    concurrentImageLimit={5} />
                                <FormError nbsp>{error?.propertyImages}</FormError>
                            </div>

                            {
                                paramUser === 'renter' &&
                                <div className="col-span-1 md:col-span-12 mt-1">
                                    <FileSelector
                                        selectedFiles={selectedDocs}
                                        setSelectedFiles={setSelectedDocs} />
                                    <FormError nbsp>{error?.propertyDocs}</FormError>
                                </div>
                            }

                            <div className="col-span-1 md:col-span-12 mt-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Amenities
                                </label>
                                <div onClick={() => setToggleAmenity(!toggleAmenity)}>
                                    <div className='min-w-[200px] inline-flex items-center justify-between gap-x-1.5 rounded-md bg-white px-4 py-2 mb-2 text-sm text-left font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer'>
                                        {
                                            selectedAmenities.length === 0
                                                ? '0 amenity selected'
                                                : `${selectedAmenities.length} amenities selected`
                                        }
                                        <ChevronDownIcon
                                            className="-mr-1 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                                {toggleAmenity && (
                                    <div className="rounded-lg p-4 border-gray-200 border border-solid">
                                        {amenities.map((amenity, index) => (
                                            <div key={index} className="flex gap-x-3 items-center">
                                                <label className="block font-medium text-gray-900">
                                                    <input
                                                        type='checkbox'
                                                        className='m-3 cursor-pointer h-4 w-4 rounded border-gray-300 txt-primary focus:ring-primary'
                                                        name={amenity.amenityName}
                                                        value={amenity.id}
                                                        checked={selectedAmenities.includes(amenity.id)}
                                                        onChange={() => selectedAmenities.includes(amenity.id)
                                                            ? setSelectedAmenities(
                                                                selectedAmenities.filter(item => item !== amenity.id))
                                                            : setSelectedAmenities([...selectedAmenities, amenity.id])} />
                                                    {amenity.amenityName}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FormError nbsp>{error?.amenities}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-12 mt-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Facilities
                                </label>
                                <div onClick={() => setToggleFacility(!toggleFacility)}>
                                    <div className='min-w-[200px] inline-flex items-center justify-between gap-x-1.5 rounded-md bg-white px-4 py-2 mb-2 text-sm text-left font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer'>
                                        {
                                            selectedFacilities.length === 0
                                                ? '0 facility selected'
                                                : `${selectedFacilities.length} facilities selected`
                                        }
                                        <ChevronDownIcon
                                            className="-mr-1 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                                {toggleFacility && (
                                    <div className="rounded-lg p-4 border-gray-200 border border-solid">
                                        {facilities.map((facility, index) => (
                                            <div key={index} className="flex gap-x-3 items-center">
                                                <label key={index} className="block font-medium text-gray-900">
                                                    <input
                                                        type='checkbox'
                                                        className='m-3 cursor-pointer h-4 w-4 rounded border-gray-300 txt-primary focus:ring-primary'
                                                        name={facility.facilityName}
                                                        value={facility.id}
                                                        checked={selectedFacilities.includes(facility.id)}
                                                        onChange={() => selectedFacilities.includes(facility.id)
                                                            ? setSelectedFacilities(
                                                                selectedFacilities.filter(item => item !== facility.id))
                                                            : setSelectedFacilities([...selectedFacilities, facility.id])} />
                                                    {facility.facilityName}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FormError nbsp>{error?.facilities}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <ButtonFilled
                                    onClick={() => submit()}>
                                    {paramUpsert === 'create'
                                        ? 'Create Property Advertisement'
                                        : 'Update Property Advertisement'}
                                </ButtonFilled>
                            </div>
                            <div className="col-span-1 md:col-span-12 mt-1">
                                <ButtonOutlined
                                    onClick={() => navigate(`/${paramUser}/properties`)}>
                                    Cancel
                                </ButtonOutlined>
                            </div>

                        </div >
                    </div >
                </Layout >
            </AuthChecker >
        );
    }
}

export default ListingUpsert;