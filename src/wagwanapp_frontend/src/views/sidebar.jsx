import Chats from "./chats";
import Navbar from "./navbar";
import Search from "./search";

export default function Sidebar(){
    return(
        <div style={{
            flex:1,
            backgroundColor:'#3e3c61',
        }}>
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}