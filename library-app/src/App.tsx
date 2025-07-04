import {useState, useEffect} from 'react';
import HomePage from './pages/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './redux/ReduxStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import { fetchUser } from './redux/slices/AuthenticationSlice';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ResourcePage from './pages/ResourcePage/ResourcePage';

function App() {


  const loggedInUser = useSelector((state: RootState) => state.authentication.loggedInUser);
  const dispatch:AppDispatch = useDispatch();

  useEffect(()=> {
    const userId = localStorage.getItem("userId");
    if(userId && !loggedInUser) {
      dispatch(fetchUser({
        userId,
        property: "loggedInUser"
      }));
    }
  }, [loggedInUser, dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route path='' element={<HomePage/>}></Route>
          <Route path='/catalog' element={<CatalogPage/>}></Route>
          <Route path='/resource/:barcode' element={<ResourcePage/>}></Route>
          <Route path='/profile/:userId' element={<ProfilePage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
