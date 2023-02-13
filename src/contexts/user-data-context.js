import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { userDataReducer } from "reducers";
import { useAuth } from "contexts";
import {
  getUserLiked,
  getUserWatchLater,
  getUserPlaylists,
  getUserHistory,
} from "utilities";

const UserDataContext = createContext();

const initUserData = {
  likedVideos: [],
  historyVideos: [],
  watchlater: [],
  playlists: [],
  playlistModal: false,
};

const UserDataProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState({});
  const [userDataState, userDataDispatch] = useReducer(
    userDataReducer,
    initUserData
  );
  const {
    auth: { isAuth, token },
  } = useAuth();

  useEffect(() => {
    if (isAuth) {
      getUserLiked(token, userDataDispatch);
      getUserWatchLater(token, userDataDispatch);
      getUserPlaylists(token, userDataDispatch);
      getUserHistory(token, userDataDispatch);
    }
  }, [isAuth]);

  return (
    <UserDataContext.Provider
      value={{
        userDataState,
        userDataDispatch,
        currentVideo: currentVideo,
        setCurrentVideo: setCurrentVideo,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

const useUserData = () => useContext(UserDataContext);

export { useUserData, UserDataProvider };
