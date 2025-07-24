import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { TfiGallery } from "react-icons/tfi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storge } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
    const [err, setErr] = useState(false)
    // const _id = Math.random().toString().substring(7)
    const nav = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                name,
                email,
            })
            await setDoc(doc(db, "rooms", res.user.uid), {
                
            })
            await setDoc(doc(db, "userRoom", res.user.uid), {
                
            })
            await updateProfile(res.user, {
                displayName:name
            })
            nav('/login')
        } catch (e) {
            setErr(true)
            console.log(e.message)
        }
    }
    return (
        <div style={{
            height: "100vh",
            backgroundColor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                backgroundColor: 'white',
                alignItems: 'center',
                display: 'flex',
                borderRadius: '10px',
                padding: "20px 60px",
                gap: "10px",
                flexDirection: 'column',
                border:' 4px solid grey'
            }}>
                <span style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#5d5b8d'
                }}>Wagwan</span>
                <span style={{
                    fontSize: '12px',
                    color: '#5d5b8d'
                }}>Register</span>
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: "column",
                    gap: "15px"
                }}>
                    <input placeholder="Username" type="text" style={{
                        padding: "15px",
                        border: 'none',
                        width: '250px',
                        borderBottom: '1px solid #a7bcff'
                    }} />
                    <input placeholder="Email" type="email" style={{
                        padding: "15px",
                        border: 'none',
                        width: '250px',
                        borderBottom: '1px solid #a7bcff'
                    }} />
                    <input placeholder="Password" type="password" style={{
                        padding: "15px",
                        border: 'none',
                        width: '250px',
                        borderBottom: '1px solid #a7bcff',
                    }} />
                    {/* <input type="file" id="file" style={{
                        display: 'none'
                    }} />
                    <label htmlFor="file" style={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: '15px',
                        color: '#8da4f1',
                        cursor: 'pointer'
                    }}>
                        <TfiGallery size={25} style={{
                            borderRadius: '5px'
                        }} />
                        <span >Add an avatar</span>
                    </label> */}
                    <button style={{
                        cursor: 'pointer',
                        border: 'none',
                        fontWeight: 'bold',
                        padding: '10px',
                        backgroundColor: '#7b96ec',
                        color: 'white'
                    }}>Sign Up</button>
                    {
                        err && <span>Something went wrong</span>
                    }
                </form>
                <p style={{
                    fontSize: '12px',
                    marginTop: '10px',
                    color: '#5d5b8d',
                    fontWeight: 'bold'
                }}>You do have an account ? <Link style={{
                    textDecoration: 'none',
                    cursor: 'pointer'
                }} to='/login'>Login</Link> </p>
            </div>
        </div>
    )
}