import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen flex  flex-col justify-center items-center gap-10'>
            <div>
                <h2 className='text-lg font-semibold'>Happy Payments</h2>
            </div>
            <div>
                <button onClick={() => navigate('/signin')} className='h-10 w-28  border-2 border-black bg-black text-white m-5 shadow-2xl rounded-xl transition-all duration-300 
                ease-in  hover:bg-white hover:text-black  hover:transition-all hove:duration-200 hove:ease-in' >Signin</button>
                <button onClick={()=> navigate('/signup')} className='h-10 w-28  border-2 border-black bg-black text-white m-5 shadow-2xl rounded-xl transition-all duration-300
                ease-in  hover:bg-white hover:text-black  hover:transition-all hove:duration-200 hove:ease-in'>Singup</button>
            </div>
        </div>
    )
}

export default Home