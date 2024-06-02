'use client'

import Image from "next/image";
import styles from "../page.module.css";
import Dashboard from "@/views/Dashboard";
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const userSession = sessionStorage.getItem('user')
  if(!user && !userSession){
    router.push('/login')
  }
  return (
    <main className={styles.main}>
      <Dashboard/>
    </main>
  );
}
