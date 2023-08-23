import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* CSS Imports */
import './App.css';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/*** Page Imports ***/
import Register from 'pages/Auth/Register';
import ResetPasswordEmail from 'pages/Auth/ResetPasswordEmail';
import ResetPasswordOTP from 'pages/Auth/ResetPasswordOTP';
import ResetPasswordSubmit from 'pages/Auth/ResetPasswordSubmit';
import ResetPasswordSuccess from 'pages/Auth/ResetPasswordSuccess';

// import Listing from 'pages/Listing';
// import Layout01 from 'layouts/Layout01';

/* Authentication */
import Landing from 'pages/Landing';
import UserTypeSelect from 'pages/Auth/UserTypeSelect';
import Login from 'pages/Auth/Login';

/* Listing */
import ListingUpsert from 'pages/Listing/ListingUpsert';
import ListingDetail from 'pages/Listing/ListingDetail';
import ListingSearch from 'pages/Listing/ListingSearch';

/* Profile */
import Profile from 'pages/Profile/Profile';

/* User */
import MyProperties from 'pages/User/MyProperties';

/* Tenant */
import Favorites from 'pages/Tenant/Favorites';
import RecentSearches from 'pages/Tenant/RecentSearches';

/* Error Pages */
import NotFound404 from 'pages/Error/NotFound404';
import Unauthorized403 from 'pages/Error/Unauthorized403';

import Forms from 'pages/Forms';

/* Admin */
import AdminLogin from 'pages/Admin/AdminLogin';
import Dashboard from 'pages/Admin/Dashboard';
import ViewAdmins from 'pages/Admin/ViewAdmins';
import ViewAmenities from 'pages/Admin/ViewAmenities';
import ViewFacilities from 'pages/Admin/ViewFacilities';
import ViewProperties from 'pages/Admin/ViewProperties';
import ViewRenters from 'pages/Admin/ViewRenters';
import ViewScamReports from 'pages/Admin/ViewScamReports';
import ViewTenants from 'pages/Admin/ViewTenants';

function App() {

    /* useState */
    const [rendered, setRendered] = useState(false);

    /* Program Initialization */
    useEffect(() => {
        setRendered(true);
    }, []);

    return (
        <Router>
            <main className='app'>
                <Routes>
                    {/* <Route path='/login' element={<Login />} />
                    <Route path='/tenant/login' element={<LoginTenant />} />
                    <Route path='/renter/login' element={<LoginRenter />} />
                    <Route path='/renter/register' element={<RegisterRenter />} />
                    <Route path='/register/success' element={<RegisterSuccess />} />
                    <Route path='/resetpassword' element={<ResetPasswordEmail />} />
                    <Route path='/resetpassword/:id/otp' element={<ResetPasswordOTP />} />
                    <Route path='/resetpassword/:id/submit' element={<ResetPasswordSubmit />} />
                    <Route path='/resetpassword/:id/success' element={<ResetPasswordSuccess />} /> */}

                    {/* SOMIN ROUTES --- DELETE */}
                    <Route path='/register/:user' element={<Register />} />
                    {/* <Route path='/register/success' element={<RegisterSuccess />} /> */}

                    {/* Listing */}
                    <Route path='/' element={<Landing />} />
                    <Route path='/listing/:id' element={<ListingDetail />} />
                    <Route path='/:user/listing/:upsert' element={<ListingUpsert />} />
                    <Route path='/search' element={<ListingSearch />} />

                    {/* Profile */}
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/profile/view/:user/:id' element={<Profile />} />

                    {/* User */}
                    <Route path='/:user/properties' element={<MyProperties />} />

                    {/* Tenant */}
                    <Route path='/tenant/favorites' element={<Favorites />} />
                    <Route path='/tenant/recents' element={<RecentSearches />} />

                    {/* Authentication */}
                    <Route path='/login' element={<UserTypeSelect />} />
                    <Route path='/register' element={<UserTypeSelect />} />
                    <Route path='/login/:user' element={<Login />} />
                    <Route path='/resetpassword/:user' element={<ResetPasswordEmail />} />
                    <Route path='/resetpassword/:user/:id/otp' element={<ResetPasswordOTP />} />
                    <Route path='/resetpassword/:user/:id/submit' element={<ResetPasswordSubmit />} />
                    <Route path='/resetpassword/:user/:id/success' element={<ResetPasswordSuccess />} />

                    {/* Authorization Roles */}
                    {/* <Route path="/dashboard"
                        render={() =>
                            isAuthenticated ? <Dashboard /> : <Redirect to="/" />
                        }
                    /> */}

                    {/* <Route element={<Layout01 />}>
                        <Route path='/listing' element={<Listing />} />
                    </Route> */}

                    {/* Default Routes */}
                    <Route path='/403' element={<Unauthorized403 />} />
                    <Route path='*' element={<NotFound404 />} />

                    <Route path='/forms' element={<Forms />} />

                    {/* Authentication */}
                    <Route path='/login' element={<UserTypeSelect />} />
                    <Route path='/register' element={<UserTypeSelect />} />
                    <Route path='/login/:user' element={<Login />} />
                    <Route path='/resetpassword/:user' element={<ResetPasswordEmail />} />
                    <Route path='/resetpassword/:user/:id/otp' element={<ResetPasswordOTP />} />
                    <Route path='/resetpassword/:user/:id/submit' element={<ResetPasswordSubmit />} />

                    {/* Admin */}
                    <Route path='/admin/login' element={<AdminLogin />} />
                    <Route path='/admin/dashboard' element={<Dashboard />} />
                    <Route path='/admin/adminlist' element={<ViewAdmins />} />
                    <Route path='/admin/amenities' element={<ViewAmenities />} />
                    <Route path='/admin/facilities' element={<ViewFacilities />} />
                    <Route path='/admin/properties' element={<ViewProperties />} />
                    <Route path='/admin/renters' element={<ViewRenters />} />
                    <Route path='/admin/scamreports' element={<ViewScamReports />} />
                    <Route path='/admin/tenants' element={<ViewTenants />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;