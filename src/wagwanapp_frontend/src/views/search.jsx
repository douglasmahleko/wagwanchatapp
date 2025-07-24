import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { useContext, useState } from "react"
import { db } from "../components/firebaseConfig"
import { AuthContext } from "../assets/authContext"

export default function Search() {

    const { currentUser } = useContext(AuthContext)

    const [username, setusername] = useState('')
    const [user, setuser] = useState('')
    const [errmsg, seterrmsg] = useState('')
    const [err, seterr] = useState(false)
    const [load, setload] = useState(false)

    const handleSearch = async () => {
        setload(true)
        seterr(false)
        if(username!== ''){
            const q = query(
            collection(db, 'users'),
            where("name", "==", username)
        )
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setuser(doc.data())
            })
        } catch (e) {
            seterr(true)
            seterrmsg(e.message)
        }
    }else{
        seterr(true)
        seterrmsg('Search value cannot be empty')
    }
        setload(false)
        setusername('')
    }

    const handlekey = e => {
        e.code === "Enter" && handleSearch()
        seterr(false)
    }

    const handleSelect = async () => {
        setusername('')
        setload(true)
        const combinedId = currentUser.uid > user.id ?
            currentUser.uid + user.uid :
            user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, "rooms", combinedId))

            if (!res.exists()) {
                await setDoc(doc(db, "rooms", combinedId), { messages: [] })

                await updateDoc(doc(db, "userRoom", currentUser.uid), {
                    [combinedId + ".usersInfo"]: {
                        uid: user.uid,
                        name: user.name,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userRoom", user.uid), {
                    [user + ".usersInfo"]: {
                        uid: currentUser.uid,
                        name: currentUser.displayName,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
        } catch (e) {
            seterr(true)
            seterrmsg('something happened create userroom')
        }
        setload(false)
        seterr(false)
        setuser('')
    }
    
    return (
        <div style={{
            borderBottom: '1px solid gray'
        }}>
            <div style={{
                padding: '10px',
            }}>
                <input value={username} placeholder="Find a User"
                    onKeyDown={handlekey} onChange={e => setusername(e.target.value)} type="text" style={{
                        border: 'none',
                        color: 'white',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        color: 'lightgray'
                    }} />
            </div>
            {err && <span style={{
                color: 'red',
                fontWeight: 'bold',
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                marginLeft: '7px',
                backgroundColor: 'white',
                alignContent: 'center',
                justifyContent: 'center',
            }}>{errmsg}</span>}
            {load && <span style={{
                color: 'white',
                fontWeight: 'bold',
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                marginLeft: '7px',
                backgroundColor: 'white',
                alignContent: 'center',
                justifyContent: 'center',
            }}>Loading...</span>}
            {user && <div onClick={handleSelect} style={{
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'white',
                cursor: 'pointer',
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '7px',
                    backgroundColor: 'white',
                    alignContent: 'center',
                    marginLeft: '7px',
                }}>
                    <span style={{
                        color: 'black',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        padding: '20px'
                    }}>{user.name[0]}</span></div>
                <div style={{
                    marginTop: '3px',
                }}>
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>{user.name}</span>
                </div>
            </div>}
        </div>
    )
}