import { storage } from '../firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { editProfile } from './FirestoreAPI';

export const uploadImageAPI = (file, id, setModalOpen, setCurrentImage) => {
    console.log(file)
    const profilePicsRef = ref(storage, `profileImages/${file.name}`)
    const uploadTask = uploadBytesResumable(profilePicsRef, file)

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((res) => {
                editProfile(id, { imageLink: res })
                setModalOpen(false)
                setCurrentImage({})
            });
        }
    )
}

export const uploadPostImageAPI = (file) => {
    console.log(file)
    const postPicsRef = ref(storage, `postImages/${file.name}`)
    const uploadTask = uploadBytesResumable(postPicsRef, file)

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((res) => {
            });
        }
    )
}