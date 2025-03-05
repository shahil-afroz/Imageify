import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Navbar() {
  const { user, loadCredit, logout, credit, setUser, setShowLogin, backendURL, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/');
  };

  return (
    <div className='flex items-center justify-between py-4 border-b-2 border-[#1081b6]'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='text-white w-28 sm:w-32 lg:w-40' />
      </Link>

      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <button onClick={() => navigate('/buy')} className='flex items-center px-4 sm:px-6 py-1.5 sm:py-3 gap-1 bg-[#04a3eb] hover:scale-105 rounded-full transition-all duration-700'>
              <img src={assets.credit_star} className='w-5' alt="Credit" />
              <p className='text-white font-medium sm:text-sm text-xl'>Credit left: {credit}</p>
            </button>
            <p className='text-white text-xl pl-4 max-sm:hidden'>Hi, {user.name || "User"}</p>
            <div className='relative group'>
              <img src={assets.profile_icon} className='w-10 drop-shadow' alt="Profile" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none rounded-md m-0 p-2 bg-white'>
                  <li onClick={logout} className='text-xl py-1 px-2 cursor-pointer pr-10'>LogOut</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={() => navigate('/buy')} className='cursor-pointer text-white text-xl'>Pricing</p>
            <button onClick={() => setShowLogin(true)} className='cursor-pointer bg-white px-7 py-2 sm:px-10 text-xl rounded-full'>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
