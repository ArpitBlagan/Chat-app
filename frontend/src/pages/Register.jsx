import {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const navigate=useNavigate();
    const [number,setNu]=useState('');
    const [name,setN]=useState('');
    const [password,setP]=useState('');
    const handleRegister=async()=>{
        try{
        const data=await axios.post('http://localhost:6020/register',{
            number,name,password
        });
        console.log(data);navigate('/')}
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='h-screen flex flex-col justify-center align-middle'>
        <div className='flex flex-col text-center'>
            <div className=' p-3
             text-white'>
             <div className='font-bold text-lg ml-20 mb-4'>Chat App</div>
               <form>
               <div className='mb-4'>
                    <lable className='pr-2'>Phone no: </lable>
                    <input className='rounded  h-10 p-2 text-black' placeholder='Enter your name'
                        onChange={(e)=>{setNu(e.target.value);}}
                        value={number}
                    />
                </div>
                <div className='mb-4 ml-5'>
                    <lable className='pr-2'>Name: </lable>
                    <input className='rounded  h-10 p-2 text-black' placeholder='Enter your name'
                        onChange={(e)=>{setN(e.target.value);}}
                        value={name}
                    />
                </div>
                <div className='mb-4'>
                    <lable className='pr-2'>Password: </lable>
                    <input type='password' className='rounded  h-10 p-2 text-black' placeholder='Enter your password'
                        onChange={(e)=>{setP(e.target.value);}}
                        value={password}
                    />
                </div>
                <Link to="/">
                <button className='
                border-rounded bg-blue-500 
                rounded pt-3 pb-3 pl-8 pr-8 
                hover:bg-blue-900 ml-20'
                onClick={(e)=>{
                    e.preventDefault();
                    handleRegister();
                }}
                >
                    Register
                </button></Link>
               </form>
               <Link to="/">
               <div className='ml-20 mt-2 text-black cursor-pointer'>Already registered ?</div>
               </Link>
            </div>
        </div>
    </div>
  )
}

export default Register