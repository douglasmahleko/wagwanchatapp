import { FaVideo } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../assets/chatContext";
import { useContext } from "react";

export default function Chat() {

    const { data } = useContext(ChatContext)

    return (
        <div style={{
            flex: 2,
            marginBottom:'40px'
        }}>
            <div style={{
                height:'50px',
                backgroundColor:'#5d5b8d',
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                padding:'10px',
                color:'lightgray',
                
            }}>
                <span>{data.user?.name}</span>
            </div>
            <Messages />
            <Input />
        </div>
    )
}