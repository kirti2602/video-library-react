import axios from "axios";
import { useToast } from "custom-hooks";

const getUserLiked = async (token, userDataDispatch) => {
  const { showToast } = useToast();
  try {
    const {
      data: { likes },
    } = await axios.get(`/api/user/likes`, {
      headers: { authorization: token },
    });
    userDataDispatch({ type: "FETCH_LIKED_VIDEOS", payload: likes });
  } catch (error) {
    showToast("error", "Couldn't fetch user's liked videos, try again later.");
  }
};

const getUserWatchLater = async (token, userDataDispatch) => {
  const { showToast } = useToast();
  try {
    const {
      data: { watchlater },
    } = await axios.get(`/api/user/watchlater`, {
      headers: { authorization: token },
    });
    userDataDispatch({ type: "FETCH_WATCH_LATER", payload: watchlater });
  } catch (error) {
    showToast("error", "Couldn't fetch user's watch later videos, try again later.");
  }
};

const getUserPlaylists = async (token, userDataDispatch) => {
  const { showToast } = useToast();
  try {
    const {
      data: { playlists },
    } = await axios.get(`/api/user/playlists`, {
      headers: { authorization: token },
    });
    userDataDispatch({ type: "SET_PLAYLISTS", payload: playlists });
  } catch (error) {
    showToast("error", "Couldn't fetch user's playlists, try again later.");
  }
};

const getUserHistory = async (token, userDataDispatch) => {
  const { showToast } = useToast();
  try {
    const {
      data: { history },
    } = await axios.get(`/api/user/history`, {
      headers: { authorization: token },
    });
    userDataDispatch({ type: "UPDATE_HISTORY", payload: history });
  } catch (error) {
    showToast("error", "Couldn't fetch user's history, try again later.");
  }
};

export { getUserLiked, getUserWatchLater, getUserPlaylists, getUserHistory };
