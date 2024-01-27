import React, { useEffect, useState } from 'react'
import axios  from 'axios';
import TransferCard from './TransferCard';
const UserSearch = () => {
    const [serach , setsearch] = useState(null);
    const [data , setdata] = useState([])
    const [show, setshow] = useState(false)
    const [id , setid] = useState(null);
    const [user,setuser] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${serach}`).then((res) => {
          setdata(res.data.user);
        })
    }, [serach])
    
  return (
    <div className='flex flex-col  justify-between  h-20 '>
          <div className='flex justify-center items-center'>
        <h1 className='text-xl font-bold'>Users</h1>
        </div>
          <div className=' w-full flex justify-center items-center h-3/5'>
        <input type="search" placeholder='search...' className='border-2 border-black w-5/6  rounded-md shadow-md p-2' onChange={(e) => {
          if(e.target.value.trim() === ""){
            setdata([]);
            return;
          }
          setsearch(e.target.value) } } />
        </div>
        <div className=' grid grid-cols-2'>
        <div className='flex flex-col justify-center items-center '>
            {data.map((user, index) => {
                return <div className='flex justify-between w-2/5 m-5 border-2 border-black' key={index}>
                    <div >
                    <h2>Name :{user.firstName}</h2>
                    <h2>{user.username}</h2>
                    </div>
                    <button className='mr-2' onClick={() => {
                      setid(user._id)
                      setshow(true);
                      setuser(user.username)
                    }}>SEND MONEY</button>
                </div>
            })}
        </div>
        { show &&  <TransferCard id={id} name={user} setshow={setshow} />}
      </div>
    </div>
  )
}

export default UserSearch