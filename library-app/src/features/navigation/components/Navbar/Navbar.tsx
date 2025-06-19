import React, {useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { setDisplayLogin } from "../../../../redux/slices/ModalSlice";
import {Book, Search} from '@mui/icons-material';

export const Navbar:React.FC = () => {


  const seacrchRef = useRef<HTMLInputElement>(null);
  const authState = useSelector((state: RootState) => state.authentication);
  
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && seacrchRef && seacrchRef.current && seacrchRef.current.value.length > 0) {
      navigate(`/catalog?barcode=${seacrchRef.current.value}&title=${seacrchRef.current.value}&description=${seacrchRef.current.value}`);
      seacrchRef.current.value = ''
    }
  }

  const handleSearchIconClicked = () => {
    if(seacrchRef && seacrchRef.current && seacrchRef.current.value.length > 0) {
      navigate(`/catalog?barcode=${seacrchRef.current.value}&title=${seacrchRef.current.value}&description=${seacrchRef.current.value}`);
      seacrchRef.current.value = '';
    }
  }

  const navigateToProfile = () => {
    if(authState.loggedInUser) navigate(`/profile/${authState.loggedInUser._id}`);
  }

  const toggleLogin = () => {
    dispatch(setDisplayLogin(true));
  }


  return(
    <nav className="navbar">
      <Link to="/" className="navbar-logo-section">
        <Book sx={{
          fontSize: "3rem"
        }} />
        <h1>My Library</h1>
        </Link>
        <div className="navbar-option-section">
          <Link to="/catalog" className="navbar-option navbar-link">
            <h2>View Catalog</h2>
          </Link>
          <div className="navbar-search-box">
            <input className="navbar-search-input" placeholder="Search Catalog" onKeyDown={handleEnterKey} ref={seacrchRef} />
            <Search onClick={handleSearchIconClicked} sx={{
              cursor: "pointer",
              fontSize: "2rem"
            }}></Search>
          </div>
          {
            authState.loggedInUser ? 
            <div className="navbar-option" onClick={navigateToProfile}>
              <h2>{authState.loggedInUser.firstName}'s Account</h2>
            </div>
            :
            <div className="navbar-option" onClick={toggleLogin}>
              <h2>Login</h2>
            </div>
          }
        </div>
    </nav>
  )
}