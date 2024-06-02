'use client'

import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../firebase'
import styles from '../../styles/dashboard.module.css'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    const handleLogout = () => {
        signOut(auth)
        sessionStorage.removeItem('user')
    }

    const handleCreate = () => {
        router.push('/create')
    }

    const handleHome = () =>{
        router.push('/')
    }

  return (
    <div>
        <header className={styles.header}>
            <div className={styles.logo} onClick={handleHome}>Dashboard</div>
            <div>
                <button style={{padding:"5px 20px", fontWeight: "600", marginRight: "20px", cursor: "pointer", borderRadius: "5px"}} onClick={()=>router.push('/draft')}>Drafts</button>
                <button style={{padding:"5px 20px", fontWeight: "600", marginRight: "20px", cursor: "pointer", borderRadius: "5px"}} onClick={handleCreate}>Create</button>
                <button style={{padding:"5px 20px", fontWeight: "600", marginRight: "20px", cursor: "pointer", borderRadius: "5px"}} onClick={handleLogout}>logout</button>
            </div>
        </header>
    </div>
  )
}

export default Header