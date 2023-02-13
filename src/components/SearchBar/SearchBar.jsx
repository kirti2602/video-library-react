import { useMemo } from "react";
import { useVideos } from "contexts";

const SearchBar = () => {
  const { videosDispatch } = useVideos();

  const handleSearchInput = (e) => {
    videosDispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  const debounceFunction = (callbackFn, delay) => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => callbackFn(...args), delay);
    };
  };

  const debouncedSearch = useMemo(() => {
    return debounceFunction(handleSearchInput, 500);
  }, []);

  return (
    <li className="search-bar">
      <input
        type="search"
        placeholder="Search videos..."
        onChange={debouncedSearch}
      />
      <label className="search-bar-icon">
        <span className="fas fa-search"></span>
      </label>
    </li>
  );
};

export default SearchBar;
