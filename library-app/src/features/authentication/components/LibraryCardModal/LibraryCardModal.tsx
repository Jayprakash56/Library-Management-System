import React from "react";
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../../redux/ReduxStore"
import { setDisplayLibraryCard } from "../../../../redux/slices/ModalSlice";
import { Modal } from "../../../../components";
import { RegisterLibraryCardForm } from "../RegisterLibraryCardForm/RegisterLibraryCardForm";



export const LibraryCardModal:React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false));
  }
  return <Modal content={<RegisterLibraryCardForm />} toggleModal={closeModal} />
}