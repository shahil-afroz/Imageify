import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from 'react-toastify';

function Login() {
  const [state, setState] = useState('Login');
  const { setShowLogin, backendURL, setToken, setUser,user,token } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendURL}/api/user/LogIn`, { email, password });
    
        if (data) {
      
          setToken(data.token);
     
          setUser(data.user);  
       
          localStorage.setItem('token', data.token);
        
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }

      } else {
        const { data } = await axios.post(`${backendURL}/api/user/SignUp`, { name, email, password });

        if (data) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          setUser(data.user);  
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form 
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative border-2 border-[#04a3eb] bg-black p-10 rounded-xl text-white'
      >
        <h1 className='text-center text-2xl text-[#00a2e9] font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {state !== "Login" && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
            <img src={assets.user_icon} alt="" />
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='outline-none text-sm bg-transparent text-white' 
              type="text" 
              placeholder='Full name' 
              required 
            />
          </div>
        )}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="" />
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='outline-none text-sm bg-transparent text-white' 
            type="email" 
            placeholder='Email Id' 
            required 
          />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="" />
          <input  
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='outline-none text-sm bg-transparent text-white' 
            type="password" 
            placeholder='Password' 
            required 
          />
        </div>

        <p className='text-sm text-[#00a2e9] my-4 cursor-pointer'>Forget Password?</p>
        <button className='bg-[#04a3eb] w-full text-white py-2 rounded-full'>
          {state === "Login" ? "Login" : "Create Account"}
        </button>
        
        {state === "Login" 
          ? <p className='mt-5 text-center'>Don't have an account? <span className='text-[#00a2e9] cursor-pointer' onClick={() => setState("SignUp")}>Sign Up</span></p>
          : <p className='mt-5 text-center'>Already have an account? <span className='text-[#00a2e9] cursor-pointer' onClick={() => setState("Login")}>Log in</span></p>
        }
        
        <img 
          onClick={() => setShowLogin(false)} 
          src={assets.cross_icon} 
          alt="" 
          className='absolute top-5 right-5 cursor-pointer' 
        />
      </motion.form>
    </div>
  );
}

export default Login;
