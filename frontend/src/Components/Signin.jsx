import React, { useState } from 'react'
import { Link  , useNavigate} from 'react-router-dom'
import axios from "axios"
import { useRecoilState } from 'recoil'
import { loginAtom } from '../atoms'
const Signin = () => {
    const navigate = useNavigate();
    const [login , setlogin ] = useRecoilState(loginAtom)


    const Click = async(event) =>{
        event.preventDefault();
        try {
            const res = await axios({
                url: 'http://localhost:3000/api/v1/user/signin',
                method: 'POST',
                data: login
            })

            if (res.status === 200) {
                localStorage.setItem('token', `Bearer ${res.data.token} `)
                localStorage.setItem('username',res.data.username);
                navigate('/dashboard')

            }
        } catch (error) {
            alert(`${error.response.data.message}`)
        }
    }

  return (
    <div className=' h-screen flex justify-center items-center  '>
          <div className='bg-transparent  h-96 w-96 grid grid-cols-1 rounded-3xl shadow-2xl'>
        <div id="theory" className=' flex flex-col justify-center items-center' >
            <h1 className='font-bold text-xl mt-5'>Sign In</h1>
            <p  className='font-semibold'>Enter your crendentail to access your account</p>
        </div>
              <form className=' flex flex-col justify-center items-center '>
                  <div className='flex flex-col p-2 w-4/5 '>
                <label htmlFor="email">Email</label>
                      <input type="email" name='email' className='border-2 border-black h-10 pl-2 rounded-md' onChange={(e) => setlogin({...login , username : e.target.value})}/>
            </div>
                  <div className='flex flex-col  p-2 w-4/5'>
                <label htmlFor="password">Password</label>
                      <input type="password" name='password' className='border-2 border-black h-10 pl-2 rounded-md' onChange={(e) => setlogin({...login , password : e.target.value})} />
            </div  >
            <div className='text-center mt-3 w-2/5'>
                      <button className='bg-black text-white h-10 w-full rounded-md' onClick={Click}>Sign In</button>
            </div>
        </form>
        <div id="footer" className=' flex justify-center '>
            <p>Don't have an account? <Link className='underline' to={'/signup'}>Signup</Link></p>
        </div>
          </div>
    </div>
  )
}

export default Signin