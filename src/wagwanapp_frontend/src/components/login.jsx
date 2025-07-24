import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Login() {
    const nav = useNavigate()
    const [err, setErr] = useState(false)
    const [load, setlaod] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setlaod(true)
        setErr(false)
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            setlaod(false)
            nav('/')
        } catch (e) {
            setErr(true)
            setlaod(false)
            console.log('error is : '+e.message)
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
                }}>Log In</span>
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: "column",
                    gap: "15px"
                }}>
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
                    {
                        load ? 
                        <button disabled={load} style={{
                        border: 'none',
                        fontWeight: 'bold',
                        padding: '10px',
                        backgroundColor: 'black',
                        color: 'white'
                    }}>Loading...</button> :
                    <button style={{
                        cursor: 'pointer',
                        border: 'none',
                        fontWeight: 'bold',
                        padding: '10px',
                        backgroundColor: '#7b96ec',
                        color: 'white'
                    }}>Sign In</button>
                    }
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
                }} to='/register'>Register</Link></p>
            </div>
        </div>
    )
}