import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './CatalogAdvancedSearch.css';

export const CatalogAdvanceSearch: React.FC = () => {
  const navigate = useNavigate();

  const isbnRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const genreRef = useRef<HTMLInputElement>(null);

  const search = () => {
    
    const params = new URLSearchParams();

    if (isbnRef.current?.value) params.append("barcode", isbnRef.current.value);
    if (titleRef.current?.value) params.append("title", titleRef.current.value);
    if (authorRef.current?.value) params.append("author", authorRef.current.value);
    if (descriptionRef.current?.value) params.append("description", descriptionRef.current.value);
    if (subjectRef.current?.value) params.append("subject", subjectRef.current.value);
    if (genreRef.current?.value) params.append("genre", genreRef.current.value);
    

    navigate(`/catalog?${params.toString()}`);
  };

    return (
    <div className="catalog-advanced-search">
      <h2>Advanced Book Search</h2>
      <p>Fill in as many or little fields to narrow down your search results</p>
      <form className="catalog-advanced-search-form">
        <div className="catalog-advanced-form-input-group">
          <p>ISBN</p>
          <input
            id="isbn"
            className="catalog-advanced-form-input"
            placeholder="ISBN"
            ref={isbnRef}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Title</p>
          <input
            id="title"
            className="catalog-advanced-form-input"
            placeholder="Title"
            ref={titleRef}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Author</p>
          <input
            id="author"
            className="catalog-advanced-form-input"
            placeholder="Author"
            ref={authorRef}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Description</p>
          <input
            id="description"
            className="catalog-advanced-form-input"
            placeholder="Description"
            ref={descriptionRef}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Subject</p>
          <input
            id="subject"
            className="catalog-advanced-form-input"
            placeholder="Subject"
            ref={subjectRef}
          />
        </div>
        <div className="catalog-advanced-form-input-group">
          <p>Genre</p>
          <input
            id="genre"
            className="catalog-advanced-form-input"
            placeholder="Genre"
            ref={genreRef}
          />
        </div>
      </form>
      <button
        className="catalog-advanced-search-button"
        onClick={search}
        type="button"
      >
        Search
      </button>
    </div>
  );
};
