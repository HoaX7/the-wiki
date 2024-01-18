import { WikiResultProps } from "../types";

export interface ISearchResultProps {
  result: WikiResultProps["query"]["search"];
  metadata: WikiResultProps["query"]["searchinfo"];
  searchQuery: string;
  setPage: (page: number) => void;
  currentPage: number;
  toggleSideBar: () => void;
  showSearch: boolean;
  setShowSearch: (bool: boolean) => void;
  onSearch: (text: string) => void;
}