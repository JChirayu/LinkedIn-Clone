import { responsiveArray } from 'antd/es/_util/responsiveObserver'
import { firestore } from '../firebaseConfig'
import { addDoc, collection, onSnapshot, updateDoc, doc, query, where, setDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

let postRef = collection(firestore, 'posts')
let userRef = collection(firestore, 'users')
let likeRef = collection(firestore, 'likes')
let commentRef = collection(firestore, 'comments')
let connectionRef = collection(firestore, 'connection')
export const PostStatusAPI = (obj) => {

    addDoc(postRef, obj)
        .then((res) => {
            toast.success('Post has been successfully posted')
        })
        .catch((error) => {
            console.log(error)
        })
}

export const GetStatusAPI = (setAllStatus) => {
    onSnapshot(postRef, (response) => {
        setAllStatus(response.docs.map((doc) => {
            return ({ ...doc.data(), id: doc.id })
        }))
    })
}

export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        setAllUsers(response.docs.map((doc) => {
            return ({ ...doc.data(), id: doc.id })
        }))
    })
}

export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => { })
        .catch((error) => {
            console.log(error)
        })
}

export const getCurrentUser = (setCurrentUser) => {
    let curEmail = localStorage.getItem('userEmail')
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }).filter((item) => {
                return item.email === curEmail
            })[0]
        )
    })
}

export const editProfile = (userId, data) => {
    let userToEdit = doc(userRef, userId)
    updateDoc(userToEdit, data)
        .then(() => {
            toast.success('Profile has been updated')
        })
        .catch((error) => {
            console.log(error)
        })
}

export const getUserStatus = (setAllStatus, userId) => {
    const userPostQuery = query(postRef, where("userId", "==", userId))
    onSnapshot(userPostQuery, (res) => {
        setAllStatus(
            res.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        )
    })
}
export const getSingleUser = (setCurrentProfile, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email))
    onSnapshot(singleUserQuery, (res) => {
        setCurrentProfile(
            res.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })[0]
        )
    })
}

export const likePost = (userId, postId, liked) => {
    try {
        let docLike = doc(likeRef, `${userId}_${postId}`)
        if (liked) {
            deleteDoc(docLike)
        } else {
            setDoc(docLike, { userId, postId })
        }
    } catch (error) {
        console.log(error)
    }

}

export const getLikes = (userId, postId, setLiked, setLikes) => {
    try {
        let likeQuery = query(likeRef, where('postId', '==', postId))
        onSnapshot(likeQuery, (res) => {
            let likes = res.docs.map((doc) => {
                return doc.data()
            })
            let likesCount = likes.length
            const isLiked = likes.some((like) => like.userId === userId)
            setLikes(likesCount)
            setLiked(isLiked)
        })
    } catch (error) {
        console.log(error)
    }
}

export const postComment = (postId, comment, timeStamp) => {
    try {
        addDoc(commentRef, { postId, comment, timeStamp })
    } catch (error) {
        console.log(error)
    }
}

export const getComments = (postId, setAllComments) => {
    try {
        let singlePostQuery = query(commentRef, where('postId', '==', postId))
        onSnapshot(singlePostQuery, (res) => {
            let comments = res.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
            setAllComments(comments)
        })
    } catch (error) {

    }
}

export const updatePost = (id, status) => {
    let docToUpdate = doc(postRef, id)
    try {
        updateDoc(docToUpdate, { status })
        toast.success('Post was updated successfully')
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => {
    let docToDelete = doc(postRef, id)
    try {
        deleteDoc(docToDelete)
        toast.success('Post was deleted successfully')
    } catch (error) {
        console.log(error)
    }
}

export const addConnection = (userId, targetId) => {
    try {
        let connectionToConnect = doc(connectionRef, `${userId}_${targetId}`)
        setDoc(connectionToConnect, { userId, targetId })
        toast.success('Connection Added!')
    } catch (error) {
        console.log(error)
    }
}

export const getConnections = (userId, targetId, setIsConnected) => {
    try {
        let connectionQuery = query(connectionRef, where('targetId', '==', targetId))
        onSnapshot(connectionQuery, (res) => {
            let connections = res.docs.map((doc) => {
                return doc.data()
            })
            const isConnected = connections.some((connection) => connection.userId === userId)
            setIsConnected(isConnected)
        })
    } catch (error) {
        console.log(error)
    }
}
