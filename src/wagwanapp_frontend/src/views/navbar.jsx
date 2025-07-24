import { signOut } from 'firebase/auth'
import { auth } from '../components/firebaseConfig'
import { useContext } from 'react'
import { AuthContext } from '../assets/authContext'

export default function Navbar(){

    const {currentUser} = useContext(AuthContext)

    return(
        <div style={{
            display:'flex',
            backgroundColor:'#2f2d52',
            alignItems:'center',
            padding:'10px',
            height:'50px',
            color:'#ddddf7',
            justifyContent:'space-between'
        }}>
            <span style={{
                fontWeight:'bold'
            }}>Wagwan</span>
            <div style={{
                display:'flex',
                gap:'10px'
            }}>
                <div style={{
                    height:'24px',
                    marginLeft:'7px',
                    backgroundColor:'#ddddf7',
                    width:'24px',
                    objectFit:'cover',
                    borderRadius:'50%',
                    alignContent:'center',
                    justifyContent:'center',
                }}><span style={{
                    color:'black',
                    fontWeight:'bold',
                    textTransform:'capitalize',
                    padding:'7px'
                }}>{ currentUser.displayName && currentUser.displayName[0]}</span></div>
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)} style={{
                    color:'#dddf7',
                    backgroundColor:'#5d5b8d',
                    fontSize:'10px',
                    border:'none',
                    cursor:'pointer',
                    fontWeight:'bold'
                }}>Logout</button>
            </div>
        </div>
    )
}