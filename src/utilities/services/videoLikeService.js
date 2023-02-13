import axios from "axios";

const addToLiked = async (
  showToast,
  userDataDispatch,
  token,
  video
) => {
  try {
    const {
      data: { likes },
    } = await axios.post(
      `/api/user/likes`,
      { video },
      {
        headers: { authorization: token },
      }
    );
    userDataDispatch({ type: "UPDATE_LIKED_VIDEOS", payload: likes });
    showToast("success", "Added to Liked Videos");
  } catch (error) {
    showToast("error", "Error, couldn't add to Liked Videos. Try again later.");
  }
};

const removeFromLiked = async (
    showToast,
    userDataDispatch,
    token,
    _id
  ) => {
    try {
      const {
        data: { likes },
      } = await axios.delete(
        `/api/user/likes/${_id}`,
        {
          headers: { authorization: token },
        }
      );
      userDataDispatch({ type: "UPDATE_LIKED_VIDEOS", payload: likes });
      showToast("success", "Removed from Liked Videos");
    } catch (error) {
      showToast("error", "Error, couldn't remove from Liked Videos. Try again later.");
    }
  };

export { addToLiked, removeFromLiked };
