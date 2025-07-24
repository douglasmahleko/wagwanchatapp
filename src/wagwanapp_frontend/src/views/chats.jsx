import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../assets/authContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../components/firebaseConfig'
import { ChatContext } from '../assets/chatContext'

export default function Chats() {

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    const [chats, setchats] = useState([])

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userRoom', currentUser.uid), (doc) => {
                setchats(doc.data())
            })
            return () => {
                unsub()
            }
        }
        currentUser.uid && getChats()
    }, [currentUser.uid])

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user })
    }
    return (
        <div style={{
            padding: '10px',
        }}>
            {
                Object.entries(chats) ? Object.entries(chats).sort((a,b) => b[1].date - a[1].date).map((chat) => {
                    console.log( 'chat[1].usersInfo ' +chat[1].usersInfo)
                    return(
                    <div key={chat[0]} onClick={() => handleSelect(chat[1].usersInfo)} style={{
                        padding: '10px',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'white',
                        cursor: 'pointer',
                        flexDirection: 'row',
                        display:'flex'
                    }} >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: '7px',
                            backgroundColor: 'white',
                            alignContent: 'center',
                        }} ><span style={{
                            color: 'black',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            padding: '20px'
                        }}>{chat[1].usersInfo && chat[1].usersInfo.name[0]}</span></div>
                        <div style={{
                            marginTop: '3px',
                            width:'100%'
                        }}>
                            <span style={{
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}>{chat[1].usersInfo && chat[1].usersInfo.name}</span>
                            <p style={{
                                fontSize: '14px',
                                color: 'gray',
                                marginTop: '-3px',
                            }}>
                                {chat[1].lastMessage?.text}
                            </p>
                        </div>
                    </div>
                )}
                ) : (
                    <span>Start a coversation</span>
                )
            }
        </div>
    )
}