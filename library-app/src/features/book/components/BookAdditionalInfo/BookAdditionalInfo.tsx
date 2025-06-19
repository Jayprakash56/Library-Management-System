import React from "react";

import './BookAdditionalInfo.css';

import { type Book } from "../../../../models/Book";


interface BookAdditionalInfoProps {
  book: Book;
}

export const BookAdditionalInfo:React.FC<BookAdditionalInfoProps> = ({book}) => {
  return (
    <div className="additonal-book-info">
      <h2>Additonal Information about: {book.title}</h2>
      <div className="additonal-book-info-container">
        <div className="additional-book-info-group">
          <h4 className="additonal-book-info-text">Published By: </h4>
          <p className="additonal-book-info-text">{book.publisher}</p>
        </div>
        <div className="additional-book-info-group">
          <h4 className="additonal-book-info-text">Published On: </h4>
          <p className="additonal-book-info-text">{new Date(book.publicationDate).toDateString()}</p>
        </div>
        <div className="additional-book-info-group">
          <h4 className="additonal-book-info-text">ISBN: </h4>
          <p className="additonal-book-info-text">{book.barcode}</p>
        </div>
        <div className="additional-book-info-group">
          <h4 className="additonal-book-info-text">Number of Pages </h4>
          <p className="additonal-book-info-text">{book.pages}</p>
        </div>
      </div>
    </div>
  )
}