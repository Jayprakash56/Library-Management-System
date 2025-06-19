import React from "react";

import './BookInformation.css';

import type { Book } from '../../../../models/Book';
import { mapAuthorsToString } from "../../utils/BookUtils";

interface BookInfoProps {
  book: Book;
}

export const BookInformation:React.FC<BookInfoProps> = ({book}) => {
  return (
    <div className="book-info">
      <div className="book-info-container">
        <img src={book.cover}  className="book-info-cover" alt={book.title}/>
        <div>
          <h2>{book.title}</h2>
          <h3>{mapAuthorsToString(book)}</h3>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  )
}