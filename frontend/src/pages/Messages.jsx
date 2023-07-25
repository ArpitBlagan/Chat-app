import { useContext, useEffect, useState, useCallback,useRef } from "react"
import { Sockett } from "../SocketContext"
const Messages = ({to}) => {
    const [mess,setM]=useState("");
    const {socket,num}=useContext(Sockett);
    const [conversation,setC]=useState([]);
    const divRef = useRef(null);

  const scrollToBottom = () => {
    // Scroll to the bottom of the div
  }
    const handlReceive=useCallback(({mess})=>{
        console.log(mess);
        setC((old)=>[...old,{number:'00000',message:mess}]);
        scrollToBottom()
    })
    useEffect(()=>{
        socket.on('receive',handlReceive);
        return ()=>{
            socket.off('receive',handlReceive);
        }
    },[])
  return (
    <div className="flex flex-col h-screen border-2 border-dotted ml-10" >
    <div className="flex-grow mb-3 flex flex-col overflow-auto" ref={divRef} >
        {conversation.map((ele,index)=>{
            if(ele.number===num){
                return <div className="flex mb-2 mt-2" key={index}><div className="flex-grow"></div><div key={index} className=" bg-blue-500 rounded text-white text-lg p-2">
                    {ele.message}
                </div></div>
            }
            return <div className="flex mb-2 mt-2" key={index}><div key={index} className="bg-blue-500 rounded text-white text-lg p-2">
                    {ele.message}
                </div><div className="flex-grow"></div></div>
        })}
    </div>
    <div className=" ">
        <input className="rounded p-2 text-black w-96" placeholder="message..." value={mess} onChange={(e)=>{setM(e.target.value)}} />
        <button className="p-2 bg-blue-600 hover:bg-blue-800 rounded ml-2"
            onClick={(e)=>{
                e.preventDefault();
                if(mess!==""){
                setC((old)=>[...old,{number:num,message:mess}]);
                socket?.emit('send',{to,mess});setM("");
                scrollToBottom()}
            }}
        >send</button>
    </div>
    </div>
  )
}
export default Messages