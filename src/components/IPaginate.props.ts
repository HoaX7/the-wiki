export interface IPaginationProps {
  currentPage: number
  setPage: (page: number) => void;
  totalCount: number;
  perPage: number;
}
