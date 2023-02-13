import axios from "axios";

const addToWatchLater = async (
  showToast,
  userDataDispatch,
  token,
  video
) => {
  try {
    const {
      data: { watchlater },
    } = await axios.post(
      `/api/user/watchlater`,
      { video },
      {
        headers: { authorization: token },
      }
    );
    userDataDispatch({ type: "UPDATE_WATCH_LATER", payload: watchlater });
    showToast("success", "Added to Watch Later");
  } catch (error) {
    showToast("error", "Error, couldn't add to Watch Later. Try again later.");
  }
};

const removeFromWatchLater = async (
    showToast,
    userDataDispatch,
    token,
    _id
  ) => {
    try {
      const {
        data: { watchlater },
      } = await axios.delete(
        `/api/user/watchlater/${_id}`,
        {
          headers: { authorization: token },
        }
      );
      userDataDispatch({ type: "UPDATE_WATCH_LATER", payload: watchlater });
      showToast("success", "Removed from Watch Later");
    } catch (error) {
      showToast("error", "Error, couldn't remove from Watch Later. Try again later.");
    }
  };

export { addToWatchLater, removeFromWatchLater };
