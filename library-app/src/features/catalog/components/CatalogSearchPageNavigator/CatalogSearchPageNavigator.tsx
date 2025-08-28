import './CatalogSearchPageNavigator.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/ReduxStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculatePaging } from '../../utils/CatalogUtils';

export const CatalogSearchPageNavigator:React.FC = () => {
  const pagingInformation = useSelector((state: RootState) => state.book.pagingInformation);
  const navigate = useNavigate();
  const {search} = useLocation();

  const navigatePrevios = () => {
    if(pagingInformation && pagingInformation.currentPage !== 1) {
      if(search.includes('&page=')) {
      let splitString = search.split("&page=");
      let newTerms = splitString[0] + `&page=${pagingInformation.currentPage - 1}`;
      navigate(`/catalog${newTerms}`);
    } else {
      let newTerms = search + `&page=${pagingInformation?.currentPage - 1}`
      navigate(`/catalog${newTerms}`);
    }
  }
}

  const navigateToNumber = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if(search.includes('&page=')) {
      let splitString = search.split("&page=");
      let newTerms = splitString[0] + `&page=${e.currentTarget.id}`;
      navigate(`/catalog${newTerms}`);
    } else {
      let newTerms = search + `&page=${e.currentTarget.id}`
      navigate(`/catalog${newTerms}`);
    }
  }

    const navigateNext = () => {
    if(pagingInformation && pagingInformation.currentPage !== pagingInformation.totalPages) {
      if(search.includes("&page=")) {
        let splitString = search.split("&page=");
        let newTerms = splitString[0] + `&page=${pagingInformation.currentPage + 1}`;
        navigate(`/catalog${newTerms}`);
      } else {
        let newTerms = search + `&page=${pagingInformation.currentPage + 1}`;
        navigate(`/catalog${newTerms}`);
      }
    }
  }

  return (
    <div className="catalog-search-page-navigator">
      <p className="catalog-search-page-navigator-navigate" onClick={navigatePrevios}>Prev</p>
      <div className="catalog-search-page-numbers">
        {pagingInformation && calculatePaging(pagingInformation).map((num) => {
          if(num === `${pagingInformation.currentPage}`) return <p key = {num} className='catalog-search-page-number number-active'>{num}</p>
          return <p key = {num} id={num} className='catalog-search-page-number' onClick={navigateToNumber}>{num}</p>
        })}
      </div>
      <p className="catalog-search-page-navigator-navigate" onClick={navigateNext}>Next</p>
    </div>
  )
}