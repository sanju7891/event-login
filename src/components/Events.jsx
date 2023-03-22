import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import DeleteEvent from './DeleteEvent';


export default function Events() {

    const [events, setEvents] = useState([]);

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
                    events.map(({ id, createdAt, price, imageUrl, description, title }) => (
                        <div className="border mt-3 p-3 bg-light " key={id}>
                            <div className="row">
                                <div className="col-3">
                                    <img src={imageUrl} alt='event' style={{width: 180, height: 180 }} />
                                </div>
                               <div className="col-9 ps-3">
                                   <h2>{title}</h2>
                                   <p className="event-date">{createdAt.toDate().toDateString()}</p>
                                   <p className="event-para">{description}</p>

                                   <DeleteEvent id={id} imageUrl={imageUrl} /> 
                               </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}