import { firestore } from './firebase.config';
import { addDoc, getDoc, deleteDoc, getDocs, updateDoc, doc, collection } from '@firebase/firestore';

const firebaseFunctions = (() => {
    const addressRef = doc(firestore, 'addresses', 'address');
    const faveStopsRef = collection(firestore, 'favouriteStops');

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

    return { 
        getAddress,
        setAddress,
        getFaveStops,
        addFaveStop,
        removeFaveStop
    }

})();

export default firebaseFunctions;