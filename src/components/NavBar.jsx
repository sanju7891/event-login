import React from 'react';
import { Link } from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function NavBar(){
    const [user] = useAuthState(auth);
    return (
        <div className="fixed-top border" style={{backgroundColor: "whitesmoke"}}>
              <div className='navbar'>
                <div>
                    Event App
                </div>
                 <Link className='nav-link' to="/">Home</Link>
                 <div className="">
                    {
                        user && (
                            <>
                             <span className='pe-4'>Signed in as {user.displayName || user.email}</span>
                               <button className="btn btn-danger" onClick={()=>{signOut(auth)}}>Logout</button>
                            
                            </>
                           
                        )
                    }
                 </div>

              </div>
        </div>
    )
}