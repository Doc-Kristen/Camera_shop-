import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../helpers/const';

interface UsePaginationProps {
  contentPerPage: number;
  count: number;
}
interface UsePaginationReturn {
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  lastReviewIndex: number;
  setLastReviewIndex: (page: number) => void;
}
type UsePagination = (arg0: UsePaginationProps) => (UsePaginationReturn);

const usePagination: UsePagination = ({ contentPerPage, count }) => {

  const { pageNumber } = useParams();
  const actualpageNumber = pageNumber ? pageNumber.match(/\d+/) : DEFAULT_PAGE;

  const [page, setPage] = useState(Number(actualpageNumber));

  const pageCount = Math.ceil(count / contentPerPage);

  const lastContentIndex = page * contentPerPage;

  const firstContentIndex = lastContentIndex - contentPerPage;

  const [lastReviewIndex, setLastReviewIndex] = useState(lastContentIndex);

  const changePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {

        if (state === pageCount) {
          return state;
        }
        return state + 1;

      } else {

        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };
  const setPageSAFE = (num: number) => {

    if (num > pageCount) {
      setPage(pageCount);

    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };
  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
    lastReviewIndex,
    setLastReviewIndex
  };
};
export default usePagination;
