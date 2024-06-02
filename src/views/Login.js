'use client'

import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
    
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signInWithEmailAndPassword(formData.email, formData.password)
            console.log(res)
            setFormData({
                email: '',
                password: ''
            })
            if(res){
                router.push('/')
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
    <div className={styles.container}>
        <h1>
        <title>Login</title>
        </h1>
        <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
            />
            <button type="submit" className={styles.button}>Login</button>
        </form>
        <p className={styles.text}>
            Don't have an account? <a href="/sign-up">Sign Up</a>
        </p>
        </div>
    </div>
    );
}

export default Login