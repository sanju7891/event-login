import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
    const [name, setName] = useState('');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleRegister = async () => {
       
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, { displayName: name });
            navigate('/')
            
        } catch (error) {
            toast(error.code, {type: "error"})
        }
    }

    return (
        <div className="border p-3 bg-light col-sm-4 mx-auto mt-5">
            <h1>Register</h1>
            <div className="form-group">
            <label>Name</label>
                <input
                    type="text"
                    onChange={(e) => { setName(e.target.value) }}
                    className='form-control'
                    placeholder="enter your name " />
                <label>Email</label>
                <input
                    type="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    className='form-control'
                    placeholder="enter your email " />

                <label>Password</label>
                <input
                    type="password"
                    className='form-control'
                    onChange={(e) => { setPassword(e.target.value) }}

                    placeholder="enter your password " />


                    

                <button className='btn btn-primary mt-2' onClick={handleRegister}>Register</button>


            </div>
        </div>
    )
}