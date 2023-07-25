import {useState,useContext, useEffect,useCallback} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import Messages from './Messages';
import { Sockett } from '../SocketContext';
const Home = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const [number,setNumber]=useState('');
    const [uss,setU]=useState([]);
    const {socket,setNN}=useContext(Sockett);
    const handleUser=useCallback((users)=>{
        console.log("fuck",users);
        const ind=users.indexOf(location.state.id);
        if(ind!==-1){
        users.splice(ind,1);}
        setU(users);console.log(uss.length);
    })
    useEffect(()=>{
        if(!location.state.id){
          navigate("/");
        }
        setNN(location.state.id);
        socket?.on('users',handleUser);
        console.log("home",socket);
        return ()=>{
          socket?.off('users',handleUser);
        }
    },[socket]);
  return (
    <div className="h-screen flex space-x-4 overflow-auto">
      <div className="text-white m-2">
        <div className='font-extrabold text-lg text-center mb-3'> Chat App</div>
        <div className='text-center'>
            <h4>Users</h4>
            {
                uss&&uss.map((ele,index)=><div onClick={(e)=>{e.preventDefault(); setNumber(ele)}}
                className='mt-10 text-black flex align-middle cursor-pointer rounded p-3' key={index}>
                <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    
                </div>
                <div className='ml-3 mt-2'>{ele}</div>
                </div>)
            }
        </div>
      </div>
      <div className=" flex flex-col flex-grow text-center align-middle justify-center">
        <div className="text-white">
          {number?
            <Messages to={number} />
          :"Chat App"}
        </div>
      </div>
    </div>
  )
}
export default Home