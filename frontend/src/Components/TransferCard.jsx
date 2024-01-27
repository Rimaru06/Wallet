import React, { useState } from 'react'
import axios  from 'axios';
const TransferCard = ({setshow, id, name}) => {
    const [amount , setamount] = useState(0);

    const transfer = async () => {
        try {
            const res = await axios({
                url: 'http://localhost:3000/api/v1/account/transfer',
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('token')
                },
                data: {
                    "to": id,
                    "amount": amount
                },
            })
            if (res.status === 200) {
                alert('transfer successfull')
                window.location = '/dashboard'
            }
            
        } catch (error) {   
            alert(`${error.response.data.message}`);
            setshow(false)
        }

    }
  return (
      <div className=' bg-transparent backdrop-blur-3xl flex justify-center items-center fixed w-screen h-screen top-0  '>
          <div className=' h-96 w-96 grid grid-cols-1 shadow-2xl rounded-full top-2/5 -translate-x-2/5'>
              <div className=' flex justify-center items-center'>
                  <h1 className='font-bold text-2xl'>Send Money</h1>
              </div>
              <div className='flex flex-col justify-evenly '>
                  <div className=' flex justify-center items-center'>
                      <h1 className='font-semibold text-lg'>{name}</h1>
                  </div>
                  <div className='flex flex-col justify-center '>
                      <label className='ml-2 font-bold' htmlFor="amount">Amount in (Rs)</label>
                      <input type="text" placeholder='Enter amount' className='border-2 border-black ml-2 mr-2 h-9 rounded-lg p-2' onChange={(e) => setamount(e.target.value)} />
                  </div>
              </div>
              <div className='flex flex-col justify-center items-center' >
                  <button className='bg-black text-white h-10 w-2/5 rounded-md' onClick={transfer}>initiate Transfer</button>
                  <button onClick={() => setshow(false)}>Close</button>
              </div>
          </div>
    </div>

  )
}       

export default TransferCard