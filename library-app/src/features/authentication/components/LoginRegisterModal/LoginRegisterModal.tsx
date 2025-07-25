import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../../components";
import './LoginRegisterModal.css';
import type { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { setDisplayLogin } from "../../../../redux/slices/ModalSlice";
import { useEffect, useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export const LoginRegisterModal:React.FC = () => {

  const authState = useSelector((state:RootState) => state.authentication);
  const dispatch : AppDispatch = useDispatch();

  const [login, setLogin] = useState<boolean> (true);

  const closeModal = () => {
    dispatch(setDisplayLogin(false));
  }

  const toggleLogin = () => {
    setLogin(!login);
  }

  useEffect(() => {
    if(authState.loggedInUser) {
      localStorage.setItem('userId', authState.loggedInUser._id);
      closeModal();
    }
    // return (() => {
    //   if(authState.loggedInUser) {
    //     localStorage.setItem('userId', authState.loggedInUser._id);
    //   }
    // })
  }, [authState.loggedInUser]);
  

  return (
    <Modal
      content = {login? <LoginForm toggleRegister={toggleLogin}/> : <RegisterForm toggleLogin={toggleLogin} />}
      toggleModal = {closeModal}
    />
  )
}