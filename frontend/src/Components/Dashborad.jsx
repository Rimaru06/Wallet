import React, { useEffect, useMemo, useState } from 'react'
import {useRecoilValue} from 'recoil'
import { balanceAtomFamily, loginAtom } from '../atoms'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import UserSearch from './UserSearch'
const Dashborad = () => {
  const navigate = useNavigate();
  const bal = useRecoilValue(balanceAtomFamily(`${(localStorage.getItem('token'))}`));
  useEffect( () =>{ 
    const authToken = localStorage.getItem('token')
    if (!authToken) {
      return navigate('/signin');
    }
  },[])
  return (
    <div className='h-screen'>
      <div className='flex justify-between '>
        <div>
          <h1 className='text-3xl font-bold mt-2'>Payment App</h1>
        </div>
        <div>
          <h2 className='text-xl font-semibold mt-2'>
            hello , {localStorage.getItem('username')}
          </h2>
          <button onClick={() => {localStorage.removeItem('token')
          localStorage.removeItem('username'); 
          navigate('/signin')}}>logout</button>
        </div>
      </div>
      <div>
        <h2 className='font-semibold'>Your Balnace : {bal} </h2>
      </div>
     
        <UserSearch />
      
    </div>
  )
}

export default Dashborad