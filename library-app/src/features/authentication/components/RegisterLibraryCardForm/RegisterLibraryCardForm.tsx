import React from "react";

import './RegisterLibraryCardForm.css';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { getLibraryCard } from "../../../../redux/slices/AuthenticationSlice";
import { setDisplayLibraryCard, setDisplayLogin } from "../../../../redux/slices/ModalSlice";

export const RegisterLibraryCardForm:React.FC = () => {
  const userState = useSelector((state:RootState) => state.authentication);

  const dispatch:AppDispatch = useDispatch();

  const handleLibraryCard = () => {
    if(userState.loggedInUser) {
      dispatch(
        getLibraryCard(userState.loggedInUser?._id)
      )
    }
  }

  const handleLoginClick = () => {
    dispatch(setDisplayLibraryCard(false));
    dispatch(setDisplayLogin(true));
  }

  return (
    <>
      {
        userState.loggedInUser ?
          <div className="register-library-card-container">
            <h3 className="register-library-card-text">Welcome {userState.loggedInUser.firstName} {userState.loggedInUser.lastName}!</h3>
            <h5 className="register-library-card-text">To signup for a new library card, or you forgot thr ID number on your, use the button below</h5>
            {
              userState.libraryCard ? <p className="register-library-card-text">Your library card number: {userState.libraryCard}</p> : 
              <button className="register-library-modal-button" onClick={handleLibraryCard}>Get Library Card </button>
            }
          </div>
          :
          <div className="register-library-card-container">
            <h3 className="register-library-card-text">you must be a member of the library to obtain the library card.</h3>
            <h4 className="register-library-card-text">Use the button below to login your account or register for free</h4>
            <button className="register-library-modal-button" onClick={handleLoginClick}>Login Here</button>
          </div>
      }
    </>
  )
}