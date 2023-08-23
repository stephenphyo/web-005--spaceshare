import { getStorage, ref } from 'firebase/storage';
import firebaseApp from '../firebase';

const firebaseStorageBuckets = {
    // Get the Default Cloud Storage Bucket
    default: getStorage(firebaseApp),
    // Get a Non-Default Cloud Storage Bucket
    // custom1: getStorage(firebaseApp, 'gs://my-custom-bucket')
};

const firebaseStorageRefs = {
    propertyImages: (filename) => ref(firebaseStorageBuckets.default, `/properties/images/${filename}`),
    propertyDocs: (filename) => ref(firebaseStorageBuckets.default, `/properties/docs/${filename}`)
    /*
    // Child references can also take paths delimited by '/'
    const spaceRef = ref(storage, 'images/space.jpg');

    // Parent allows us to move to the parent of a reference
    // imagesRef now points to 'images'
    const spaceRef = ref(storage, 'images/space.jpg');
    const imagesRef = spaceRef.parent;

    // Root allows to move all the way back to the top of the bucket
    // rootRef now points to the root
    const rootRef = spaceRef.root;
    */
};

export { firebaseStorageBuckets, firebaseStorageRefs };
