import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function Navbar() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/logout", {
        withCredentials: true
      })
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out,", error);
    }
  }

  console.log(currentUser);

  return (
    <div className='navbar'>
      <div className="logo">
        <Link to="/">
          <img src="https://i.pinimg.com/originals/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg" alt="" />
        </Link>
      </div>
      <div className='links'>
        <Link className='link' to="/?cat=art"> <h6>ART</h6> </Link>
        <Link className='link' to="/?cat=science"> <h6>science</h6> </Link>
        <Link className='link' to="/?cat=technology"> <h6>technology</h6> </Link>
        <Link className='link' to="/?cat=cinema"> <h6>cinema</h6> </Link>
        <Link className='link' to="/?cat=design"> <h6>design</h6> </Link>
        <Link className='link' to="/?cat=food"> <h6>food</h6> </Link>
        <Link className='link write' to="/write"> Write</Link>
      </div>

      <div className='authSection'>
        {currentUser?.user?.username
          ? (
            <div className='logout'>
              <img src={currentUser.user.userImg}/>
              <span className='username'>{currentUser.user.username}</span>
              <span onClick={handleLogout} className='logoutIcon'>
                <LogoutIcon fontSize="small"/>
              </span>
            </div>
          )
          : <Link className='link login' to="/login"> <LoginIcon fontSize="small"/> </Link>
        }
      </div>
    </div>
  )
}

export default Navbar