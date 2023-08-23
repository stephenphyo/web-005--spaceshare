import { uploadBytes, refFromURL, getStorage, ref, deleteObject, getDownloadURL } from 'firebase/storage';
import { firebaseStorageBuckets } from './firebaseCloudStorage';
import { v4 as uuidv4 } from 'uuid';

const deleteFile = async (fileURL) => {
    const downloadURL = await getDownloadURL(ref(firebaseStorageBuckets.default, fileURL));

    // Create a reference using the download URL
    const fileRef = ref(firebaseStorageBuckets.default, downloadURL);

    // Delete the file
    await deleteObject(fileRef);
    return fileURL;
}

const deleteFiles = async (storageRef, fileURLs) => {
    const filePromises = fileURLs.map(fileURL => {

        return deleteFile(fileURL);
    });

    return await Promise.all(filePromises);
}

export default deleteFiles;