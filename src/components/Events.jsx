import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import DeleteEvent from './DeleteEvent';


export default function Events() {

    const [events, setEvents] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const eventRef = collection(db, 'events');
        const q = query(eventRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            // console.log(snapshot)
            const events = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEvents(events);
            console.log(events);
        })
    }, [])
    return (
        <div>
            {
                events.length === 0 ? (
                    <p>No Events found</p>
                ) : (
                    events.map(({ id, createdAt, price, imageUrl, description, title, createdBy, userId }) => (
                        <div className="border mt-3 p-3 bg-light " key={id}>
                            <div className="row">
                                <div className="col-3">
                                    <img src={imageUrl} alt='event' style={{ width: 180, height: 180 }} />
                                </div>
                                <div className="col-9 ps-3">
                                    <div className="row">

                                        <div className="col-6">
                                            {
                                                createdBy && (
                                                    <span className="badge bg-primary">{createdBy}</span>
                                                )
                                            }
                                        </div>
                                        <div className="col-6 d-flex flex-row-reverse">
                                            {
                                                user && user.uid === userId && (
                                                    <DeleteEvent id={id} imageUrl={imageUrl} />

                                                )
                                            }
                                        </div>

                                    </div>
                                    <h3>{title}</h3>
                                    <p className="event-date">{createdAt.toDate().toDateString()}</p>
                                    <h5 className="event-para">{description}</h5>
                                    <p>{price}</p>
                                    {/* <DeleteEvent id={id} imageUrl={imageUrl} /> */}


                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}