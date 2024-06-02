'use client'

import React, { useState } from 'react'
import styles from '../styles/signup.module.css'
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { useRouter } from 'next/navigation'

const Signup = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
      });

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)
    
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password === formData.confirmPassword){
        try {
            const res = await createUserWithEmailAndPassword(formData.email, formData.password)
            console.log(res)
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
            })
            router.push('/login')
        } catch (error) {
            console.error(error)
        }
    }else{
        alert("Password didn't match")
    }
    };
    
    return (
    <div className={styles.container}>
        <h1>
        <title>Sign Up</title>
        </h1>
        <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign Up</h1>
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
            <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={styles.input}
            />
            <button type="submit" className={styles.button}>Sign Up</button>
        </form>
        <p className={styles.text}>
            Already have an account? <a href="/login">Login</a>
        </p>
        </div>
    </div>
    );
}

export default Signup