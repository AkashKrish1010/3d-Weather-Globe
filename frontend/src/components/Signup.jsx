import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, { name, email, password });
            const user = response.data;
            if (!user.success) {
                alert('Signup failed');
                return;
            }
            const token = user.token;
            if (!token) {
                alert('No token received');
                return;
            }
            localStorage.setItem("token", token);
            alert(user.message);
            navigate('/login');

        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-xl'>
                <h1 className='text-4xl font-bold text-center text-blue-600 mb-6'>
                    Create Account
                </h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
                    <input
                        type='text'
                        placeholder='Full Name'
                        className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type='email'
                        placeholder='Email'
                        className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type='submit'
                        className='bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold'
                    >
                        Sign Up
                    </button>
                    <p className='text-center text-gray-500 mt-4'>
                        Already have an account? <a href="/login" className='text-blue-600 hover:underline'>Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
