const userDataReducer = (userDataState, { type, payload }) => {
  switch (type) {
    case "FETCH_LIKED_VIDEOS":
      return {
        ...userDataState,
        likedVideos: [...payload],
      };

    case "UPDATE_LIKED_VIDEOS":
      return { ...userDataState, likedVideos: [...payload] };

    case "FETCH_WATCH_LATER":
      return {
        ...userDataState,
        watchlater: [...payload],
      };

    case "UPDATE_WATCH_LATER":
      return { ...userDataState, watchlater: [...payload] };

    case "UPDATE_PLAYLIST":
      return {
        ...userDataState,
        playlists: userDataState.playlists.map((playlist) =>
          playlist._id === payload._id ? payload : playlist
        ),
      };

    case "SET_PLAYLISTS":
      return { ...userDataState, playlists: payload };

    case "UPDATE_HISTORY":
      return { ...userDataState, historyVideos: payload };

    default:
      return userDataState;
  }
};

export { userDataReducer };
