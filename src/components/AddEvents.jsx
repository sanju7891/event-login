import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebaseConfig';

export default function AddEvents() {
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        createdAt: Timestamp.now().toDate(),
    })

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });

    }

    const handlePublish = () => {
        if (!formData.title || !formData.description || !formData.image || !formData.price) {
            alert('please fill all fields');
            return;
        }

        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);

        const uploadImage = uploadBytesResumable(storageRef, formData.image);

        uploadImage.on("state_changed",
            (snapshot) => {
                const progressPercent = Math.round((snapshot.bytesTranferred / snapshot.totalBytes) * 100);

                setProgress(progressPercent);
            },
            (err) => {
                console.log(err)
            },
            () => {
                setFormData({
                    title: "",
                    description: "",
                    image: "",
                    price: "",

                });
                getDownloadURL(uploadImage.snapshot.ref)
                    .then((url) => {
                        const eventRef = collection(db, "events");
                        addDoc(eventRef, {
                            title: formData.title,
                            description: formData.description,
                            imageUrl: url,
                            price: formData.price,
                            createdAt: Timestamp.now().toDate(),
                            createdBy: user.displayName,
                            userId: user.uid,
                        })
                            .then(() => {
                                toast("Event add successfully", { type: "success" });
                                setProgress(0);
                            })
                            .catch(err => {
                                toast("Error adding event", { type: "error" });
                            })
                    }
                    )
            }
        );

    }
    return (
        <div className="border p-3 mt-3 bg-light">
            {
                !user ?
                    <>
                        <Link to='/login'> Login to post event</Link>
                        Don't have an account? <Link to='/register' >Register</Link>
                    </> :

                    <>

                        <h2>Create Event</h2>
                        <label>Title</label>
                        <input type="text" name="title" className='form-control' value={formData.title} onChange={(e) => handleChange(e)} />

                        <label>Description</label>
                        <textarea type="text" name="description" className='form-control' value={formData.description} onChange={(e) => handleChange(e)} />
                       
                        <label>Price</label>
                        <input type="text" name="price" className='form-control' value={formData.price} onChange={(e) => handleChange(e)} />

                        <label>Image upload</label>
                        <input type="file" name="image" accept='image/*' className='form-control' onChange={(e) => handleImageChange(e)} />
                     
                       
                        {
                            progress === 0 ? null :
                                <div className="progress mt-2">
                                    <div className='progress-bar progress-bar-striped mt-2 ' stlye={{ width: `${progress}%` }}>
                                        {`uploading image ${progress}%`}
                                    </div>

                                </div>
                        }


                        <button className="btn btn-primary mt-2" onClick={handlePublish}>Post</button>
                    </>

            }

        </div>
    )
}