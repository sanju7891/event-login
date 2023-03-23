import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleLogin = async () => {

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/')

        } catch (error) {
            toast(error.code, { type: "error" })
        }
    }

    return (
        <div className="border p-3 bg-light col-sm-4 mx-auto mt-5">
            <h1 className='text-center'>Login</h1>

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

            <button className='btn btn-primary mt-2' onClick={handleLogin}>Login</button>

            <p> Don't have an account? <Link to='/register' >Register</Link></p>

        </div>
    )
}