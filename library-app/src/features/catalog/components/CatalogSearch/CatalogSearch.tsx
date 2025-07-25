import React, {useEffect} from "react";
import './CatalogSearch.css';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/ReduxStore";
import { useLocation } from "react-router-dom";
import { queryBooks } from "../../../../redux/slices/BookSlice";
import { BookCard } from "../../../book";
import { CatalogAdvanceSearch } from "../CatalogAdvancedSearch/CatalogAdvancedSearch";
import { CatalogSearchPageNavigator } from "../CatalogSearchPageNavigator/CatalogSearchPageNavigator";

export const CatalogSearch:React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const dispatch:AppDispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(queryBooks(location.search));
  }, [location.search])

  return (
    <div className="catalog-search">
      <div className="catalog-search-advanced-search-section">
        <CatalogAdvanceSearch/>
      </div>
      {
        !bookState.loading ?
        <>
        <h2>Displaying {bookState.pagingInformation?.pageCount} books out of {bookState.pagingInformation?.totalCount}</h2>
        <div className="catalog-search-item-area">
          {bookState.books.map((book) => <BookCard key={book.barcode} book = {book} />)}
        </div>
        <div className="catalog-search-pages">
          <CatalogSearchPageNavigator/>
        </div>
        </>
        : <></>
      }
    </div>
  )
}