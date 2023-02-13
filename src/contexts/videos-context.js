import { createContext, useContext, useReducer, useEffect } from "react";
import { videosReducer } from "reducers";
import { fetchVideos, searchVideos, fetchCategories, filterVideos } from "utilities";
import { useToast } from "custom-hooks";

const VideosContext = createContext();

const initVideos = {
  videos: [],
  videosLoading: true,
  searchQuery: "",
  vidCategories: [],
  selectedCategory: "All",
};

const { showToast } = useToast();

const VideosProvider = ({ children }) => {
  const [videosState, videosDispatch] = useReducer(videosReducer, initVideos);

  const getVideos = async () => {
    try {
      const {
        data: { videos },
      } = await fetchVideos();
      videosDispatch({ type: "FETCH_VIDEOS", payload: videos });
    } catch (error) {
      showToast("error", "Can't fetch videos. Refresh and try again.");
    }
  };

  const getCategories = async () => {
    try {
      const {
        data: { categories },
      } = await fetchCategories();
      videosDispatch({ type: "INIT_CATEGORIES", payload: categories });
    } catch (error) {
      showToast("error", "Can't fetch categories. Refresh and try again.");
    }
  };

  const {
    videos,
    searchQuery,
    videosLoading,
    vidCategories,
    selectedCategory,
  } = videosState;

  const getSearchResultVideos = searchVideos(videos, searchQuery);
  const getFilteredVideos = filterVideos(getSearchResultVideos, selectedCategory);

  useEffect(() => {
    getVideos();
    getCategories();
  }, []);

  return (
    <VideosContext.Provider
      value={{
        videosLoading,
        searchQuery,
        videos: getFilteredVideos,
        vidCategories,
        selectedCategory,
        videosDispatch,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosProvider };
