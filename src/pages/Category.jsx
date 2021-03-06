import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    //pagination piece of state
    const [lastFetchedListing, setLastFetchedListing] = useState(null);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                //get reference to a collection in firebase
                const listingsRef = collection(db, 'listings');
                //create a query
                const q = query(
                    listingsRef,
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(2)
                );
                //exceute the query
                const querySnap = await getDocs(q);

                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetchedListing(lastVisible);
                const listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error('Could not fetch listings');
            }
        };
        fetchListings();
    }, [params.categoryName]);

    //Pagination function

    const onFetchMoreListings = async () => {
        try {
            //get reference to a collection in firebase
            const listingsRef = collection(db, 'listings');
            //create a query
            const q = query(
                listingsRef,
                where('type', '==', params.categoryName),
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing),
                limit(10)
            );
            //execute the query
            const querySnap = await getDocs(q);

            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetchedListing(lastVisible);
            const listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            setListings((prevState) => [...prevState, ...listings]);
            console.log(listings);
            setLoading(false);
        } catch (error) {
            toast.error('Could not fetch listings');
            console.log(listings);
        }
    };

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent'
                        ? 'Offices for rent'
                        : 'Offices for sale'}
                </p>
            </header>
            {loading ? (
                <Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem
                                    listing={listing.data}
                                    id={listing.id}
                                    key={listing.id}
                                />
                            ))}
                        </ul>
                    </main>
                    <br />
                    <br />
                    {/* listings length limit fixed
                    TODO: dynamic length */}
                    {listings.length > 1 && lastFetchedListing && (
                        <p className="loadMore" onClick={onFetchMoreListings}>
                            Load More
                        </p>
                    )}
                </>
            ) : (
                <p>No listings for {params.categoryName}</p>
            )}
        </div>
    );
}

export default Category;
