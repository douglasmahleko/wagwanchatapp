import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../assets/chatContext";
import Message from "./message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../components/firebaseConfig";

export default function Messages(){

    const [messages, setmessages] = useState([])
    const { data } = useContext(ChatContext)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "rooms", data.chatId), (doc) => {
            doc.exists() && setmessages(doc.data().messages)
        })

        return () => {
            unsub()
        }
    }, [data.chatId])

    return(
        <div style={{
            backgroundColor:'#ddddf7',
            padding:'10px',
            height:"79%",
            overflow:'scroll'
        }}>
            {
                messages && messages.map((msg) => {
                    return(
                        <Message msg={msg} key={msg.id} />
                    )
                })
            }
            
        </div>
    )
}