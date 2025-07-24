import { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../assets/authContext'
import { ChatContext } from '../assets/chatContext'

export default function Message({ msg }) {

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [msg])

    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '5px',
            justifyContent: 'space-between'
        }}>
            {
                msg.senderId === currentUser.uid ? (
                    <div style={{
                        display: 'flex',
                        color: 'gray',
                        fontWeight: '500',
                        flexDirection: 'row',
                        gap:'10px'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            backgroundColor: 'black',
                            alignContent: 'center',
                            justifyContent: 'center',
                        }} ><span style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            padding: '13px'
                        }}>{currentUser.displayName[0]}</span></div>
                        <p style={{
                            padding: '10px 20px',
                            borderRadius: '0px 10px 10px 10px',
                            maxWidth: 'max-content',
                            alignContent: 'center',
                            justifyContent: 'center',
                            backgroundColor:'#5d5b8d'
                        }} >{msg.text}</p>
                    </div>
                ) : (
                    <div style={{
                        maxWidth: '70%',
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft:'380px',
                        gap:'0px',
                    }}>
                        <p style={{
                            backgroundColor: 'white',
                            padding: '5px 10px',
                            borderRadius: '10px 0px 10px 10px',
                            maxWidth: 'max-content',
                        }}>{msg.text}</p>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            backgroundColor: 'black',
                            alignContent: 'center',
                            marginLeft:'15px'
                        }} ><span style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            padding: '13px',
                        }}>{dispatch.name[0]}</span></div>
                    </div>
                )
            }
        </div>
    )
}