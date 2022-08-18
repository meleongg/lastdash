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

    const checkStopExistsInFaveStops = async (routeNum, stopNum) => {
        const faveStops = await getFaveStops();
        let keys = Object.keys(faveStops);

        for (let i=0; i<keys.length; i++) {
            let ithRouteNum = faveStops[keys[i]].routeNum;
            let ithStopNum = faveStops[keys[i]].stopNum;

            if (ithRouteNum === routeNum && ithStopNum === stopNum) {
                return true;
            }
        }

        return false; 
    }
    
    const checkStopExistsInRecentStops = async (routeNum, stopNum) => {
        const routes = await getRecentRoutes();
        let keys = Object.keys(routes);

        for (let i=0; i<keys.length; i++) {
            let ithRouteNum = routes[keys[i]].routeNum;
            let ithStopNum = routes[keys[i]].stopNum;

            if (ithRouteNum === routeNum && ithStopNum === stopNum) {
                return true;
            }
        }

        return false; 
    }
    
    const checkAddressExistsInRecentAddresses = async (address, radius) => {
        const addresses = await getRecentAddresses();
        let keys = Object.keys(addresses);

        for (let i=0; i<keys.length; i++) {
            let ithAddress = addresses[keys[i]].routeNum;
            let ithRadius = addresses[keys[i]].stopNum;

            if (ithAddress === address && ithRadius === radius) {
                return true;
            }
        }

        return false; 
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
        clearRecentAddresses,
        checkStopExistsInFaveStops,
        checkStopExistsInRecentStops,
        checkAddressExistsInRecentAddresses
    }

})();

export default firebaseFunctions;