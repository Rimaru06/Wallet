import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
  const navigate = useNavigate();
  const [detail , setdetail] = useState({
    firstName : "",
    lastName : "",
    username : "",
    password : ""
  })
  const Click = async (event)=>{
    event.preventDefault();
    try {
      const res = await axios({
        url: 'http://localhost:3000/api/v1/user/signup',
        method : 'POST',
        data : detail
      })
      if (res.status === 200) {
        console.log(res);
        navigate('/signin');
        
      }
    } catch (error) {
      alert(`${error.response.data.message}`)
    }
  }
  return (
    <div className=' h-screen flex justify-center items-center  '>
      <div className='bg-transparent  h-3/4 w-96 grid grid-cols-1 rounded-3xl shadow-2xl'>
        <div id="theory" className=' flex flex-col justify-center items-center' >
          <h1 className='font-bold text-xl mt-5'>Sign Up</h1>
          <p className='font-semibold'>Enter your Information to create your account</p>
        </div>
        <form className=' flex flex-col justify-center items-center '>
          <div className='flex flex-col p-2 w-4/5'>
            <label htmlFor="firstname">First-Name</label>
            <input type="text" name='firstname' className='border-2 border-black h-10 pl-2 rounded-md'  onChange={(e) => setdetail({...detail , firstName : e.target.value})}/>
          </div>
          <div className='flex flex-col p-2 w-4/5'>
            <label htmlFor="lasstname">Last-Name</label>
            <input type="text" name='lastname' className='border-2 border-black h-10 pl-2 rounded-md' onChange={(e) => setdetail({...detail,lastName : e.target.value})} />
          </div>
          <div className='flex flex-col p-2 w-4/5 '>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' className='border-2 border-black h-10 pl-2 rounded-md' onChange={(e) => setdetail({...detail,username : e.target.value})} />
          </div>
          <div className='flex flex-col  p-2 w-4/5'>
            <label htmlFor="password">Password</label>
            <input type="text" name='password' className='border-2 border-black h-10 pl-2 rounded-md' onChange={(e) => setdetail({...detail, password : e.target.value})} />
          </div  >
          <div className='text-center mt-3 w-2/5'>
            <button className='bg-black text-white h-10 w-full rounded-md' onClick={Click}>Sign Up</button>
          </div>
        </form>
        <div id="footer" className=' flex justify-center '>
          <p >Already have an account? <Link className='underline'  to={'/signin'}>Signin</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup