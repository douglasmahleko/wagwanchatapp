import Chat from "../views/chat";
import Sidebar from "../views/sidebar";

export default function Home() {
    return (
        <div style={{
            backgroundColor:'black',
            height:'100vh',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
            
        }}>
            <div style={{
                border:'1px solid white',
                width:'65%',
                height:'80%',
                borderRadius:'10px',
                display:'flex',
                overflow:'hidden'
        }}>
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}