import { TfiGallery } from "react-icons/tfi";
import { GrAttachment } from "react-icons/gr";
import { AuthContext } from "../assets/authContext";
import { ChatContext } from "../assets/chatContext";
import { useContext, useState } from "react";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storge } from "../components/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Navigate } from "react-router-dom";

export default function Input() {

    const [text, settext] = useState('')
    const [img, setimg] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSent = async () => {
        if (img) {
            const storageRef = ref(storge, Math.random().toString().substring(7))
            const uploadTask = uploadBytesResumable(storageRef, img)
            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                        await updateDoc(doc(db, "rooms", data.chatId), {
                            messages: arrayUnion({
                                id: Math.random().toString().substring(7),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: url
                            })
                        })
                    })
                }
            )
        } else {
            await updateDoc(doc(db, "rooms", data.chatId), {
                messages: arrayUnion({
                    id: Math.random().toString().substring(7),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now()
                })
            })
        }
        await updateDoc(doc(db, "userRoom", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userRoom", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        })
        settext('')
        setimg(null)
    }

    return (
        <>
            {
                currentUser ?
                    <div style={{
                        height: "60px",
                        backgroundColor: 'white',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "space-between",
                    }}>
                        <input placeholder="type the message" value={text} onChange={e => settext(e.target.value)} type="text" style={{
                            width: '80%',
                            border: 'none',
                            outline: 'none',
                            fontSize: '18px',
                            color: '#2f2d52',
                            cursor:'pointer',
                            marginBottom:'30px'
                        }} />
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            marginBottom:'30px'
                        }}>
                            <input type="file" id="file" onChange={e => setimg(e.target.files[0])} style={{
                                display: 'none'
                            }} />
                            <label htmlFor="file" style={{
                                alignItems: 'center',
                                display: 'flex',
                                gap: '15px',
                                color: '#8da4f1',
                            }}>
                                <TfiGallery size={25} style={{
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }} />
                            </label>
                            <button onClick={handleSent} style={{
                                cursor: 'pointer',
                                border: 'none',
                                fontWeight: 'bold',
                                padding: '10px 15px',
                                backgroundColor: '#7b96ec',
                                color: 'white'
                            }}>Send</button>
                        </div>
                    </div> :
                    <Navigate to='/login' />
            }
        </>

    )
}