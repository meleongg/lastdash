import { firestore } from './firebase.config';
import { addDoc, getDoc, deleteDoc, getDocs, updateDoc, doc, collection } from '@firebase/firestore';

const firebaseFunctions = (() => {
    const addressRef = doc(firestore, 'addresses', 'address');
    const faveStopsRef = collection(firestore, 'favouriteStops');
    const recentRoutesRef = collection(firestore, 'recentRoutes');
    const recentAddressesRef = collection(firestore, 'recentAddresses');

    const getAddress = async () => {
        try {
            const docSnapshot = await getDoc(addressRef);
            const docData = docSnapshot.data();
            return docData;
        } catch (e) {
            console.log('Could not get address data.', e);
        }
    }

    const setAddress = async (val, radius) => {
        try {
            await updateDoc(addressRef, {
                value: val,
                radius: radius
            });
        } catch (e) {
            console.log('Unable to update address.', e);
        }
    }

    const getFaveStops = async () => {
        try {
            const getSnapshot = await getDocs(faveStopsRef);

            let data = {};
            getSnapshot.forEach((doc) => {
                data[doc.id] = doc.data();
            });

            return data; 
        } catch (e) {
            console.log('Unable to get favourite stops.', e);
        }
    }

    const addFaveStop = async (routeNum, stopNum) => {
        let data = {
            routeNum: routeNum, 
            stopNum: stopNum,
        }

        try {
            await addDoc(faveStopsRef, data);
        } catch (e) {
            console.log('Unable to add favourite stop.', e);
        }
    }

    const removeFaveStop = async (id) => {
        try {
            await deleteDoc(doc(firestore, 'favouriteStops', id));
        } catch (e) {
            console.log('Unable to delete favourite stop.', e);
        }
    }

    const getRecentRoutes = async () => {
        try {
            const getSnapshot = await getDocs(recentRoutesRef);

            let data = {};
            getSnapshot.forEach((doc) => {
                data[doc.id] = doc.data();
            });

            return data; 
        } catch (e) {
            console.log('Unable to get recent routes.', e);
        }
    }

    const addRecentRoute = async (routeNum, stopNum) => {
        let data = {
            routeNum: routeNum, 
            stopNum: stopNum,
        }

        try {
            await addDoc(recentRoutesRef, data);
        } catch (e) {
            console.log('Unable to add recent route.', e);
        }
    }

    const clearRecentRoutes = async () => {
        try {
            const getSnapshot = await getDocs(recentRoutesRef);

            let ids = [];
            getSnapshot.forEach((doc) => {
                ids.push(doc.id);
            });

            ids.forEach(async (id) => {
                await deleteDoc(doc(firestore, 'recentRoutes', id));
            });
        } catch (e) {
            console.log('Unable to clear recent routes.', e);
        }
    }
    
    const getRecentAddresses = async () => {
        try {
            const getSnapshot = await getDocs(recentAddressesRef);

            let data = {};
            getSnapshot.forEach((doc) => {
                data[doc.id] = doc.data();
            });

            return data; 
        } catch (e) {
            console.log('Unable to get recent addresses.', e);
        }
    }

    const addRecentAddress = async (address, radius) => {
        let data = {
            address: address, 
            radius: radius,
        }

        try {
            await addDoc(recentAddressesRef, data);
        } catch (e) {
            console.log('Unable to add recent address.', e);
        }
    }

    const clearRecentAddresses = async () => {
        try {
            const getSnapshot = await getDocs(recentAddressesRef);

            let ids = [];
            getSnapshot.forEach((doc) => {
                ids.push(doc.id);
            });

            ids.forEach(async (id) => {
                await deleteDoc(doc(firestore, 'recentAddresses', id));
            });
        } catch (e) {
            console.log('Unable to clear recent addresses.', e);
        }
    }

    return { 
        getAddress,
        setAddress,
        getFaveStops,
        addFaveStop,
        removeFaveStop,
        getRecentRoutes,
        addRecentRoute,
        clearRecentRoutes,
        getRecentAddresses,
        addRecentAddress,
        clearRecentAddresses
    }

})();

export default firebaseFunctions;