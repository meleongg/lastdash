import { firestore } from './firebase.config';
import { addDoc, getDoc, updateDoc, doc, collection } from '@firebase/firestore';

const firebaseFunctions = (() => {
    const addressRef = doc(firestore, 'addresses', 'address');

    const getAddressFromHomePage = async () => {
        try {
            const docSnapshot = await getDoc(addressRef);
            const docData = docSnapshot.data();
            return docData;
        } catch (e) {
            console.log('Could not get address data.', e);
        }
    }

    const setAddressFromHomePage = async (val, radius) => {
        try {
            await updateDoc(addressRef, {
                value: val,
                radius: radius
            });
        } catch (e) {
            console.log('Unable to update address.', e);
        }
    }

    return { 
        getAddressFromHomePage,
        setAddressFromHomePage
    }

})();

export default firebaseFunctions;