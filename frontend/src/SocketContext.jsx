import {  createContext,useEffect,useState,useRef } from "react";
import Cookies from 'js-cookie';
export const Sockett=createContext();
import { io } from "socket.io-client";

const SocketContext = (props) => {
  const [num,setNN]=useState('');
  const [socket,setS]=useState();
  useEffect(()=>{
    const ff=io('https://chatt-backend.onrender.com',{
      query:{num}
    });setS(ff);
    return ()=>{
      ff.close();
    }
  },[num])
  console.log(socket);
  return (
    <Sockett.Provider value={{socket:socket,setNN,num}}>
        {props.children}
    </Sockett.Provider>
  )
}
export default SocketContext