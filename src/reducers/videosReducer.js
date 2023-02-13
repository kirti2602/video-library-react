const videosReducer = (videosState, { type, payload }) => {
  switch (type) {
    case "FETCH_VIDEOS":
      return { ...videosState, videos: payload, videosLoading: false };

    case "SET_SEARCH_QUERY":
      return { ...videosState, searchQuery: payload };

    case "INIT_CATEGORIES": 
    return { ...videosState, vidCategories: payload };

    case "SELECT_CATEGORY": 
    return { ...videosState, selectedCategory: payload }

    case "CLEAR_CATEGORY": 
    return { ...videosState, selectedCategory: payload }

    default:
      return videosState;
  }
};

export { videosReducer };
