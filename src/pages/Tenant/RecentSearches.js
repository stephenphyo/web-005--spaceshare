import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/* Component Imports */
import Layout from 'components/layout/Layout';
import Heading from 'components/ui/Heading';
import Card from 'components/ui/Card';

/* MUI Imports */
import { CircularProgress } from '@mui/material';

/* Context Improts */
import AuthContext from 'contexts/AuthContext';

/* Utility Imports */
import Axios from 'utils/Axios';

function RecentSearches() {

    /* useState */
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [rendered, setRendered] = useState(false);

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* useNavigate */
    const navigate = useNavigate();

    /* useEffect */
    useEffect(() => {
        setRendered(true);
    }, []);

    useEffect(() => {
        if (rendered && !auth) navigate('/');
    }, [rendered, auth]);

    useEffect(() => {
        if (!rendered) return;
        setLoading(true);
        Axios.get(`/api/tenant/${auth?.id}/recents`)
            .then(res => {
                if (res.status === 200) {
                    setProperties(res.data);
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
    }, [rendered, auth]);

    useEffect(() => {
        if (!rendered) return;

        if (auth?.id) {
            Axios.get(`/api/tenant/${auth?.id}/favourites/id`)
                .then(res => {
                    if (res.status === 200) {
                        setFavorites(res.data);
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
    }, [rendered, auth]);

    return (
        <Layout>
            <Heading title="My Recent Searches" />
            <section className='py-10 border-b border-gray-200 mb-24'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full flex-grow">
                    {
                        loading
                            ? <CircularProgress />
                            : properties.map((property, index) => (
                                <Card
                                    key={index}
                                    data={property}
                                    isFavorite={favorites.indexOf(property?.id) !== -1}
                                    userType={auth?.userType}>
                                </Card>
                            ))
                    }
                </div>
            </section>
        </Layout>
    );
}

export default RecentSearches;