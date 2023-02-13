import axios from "axios";

const addToHistory = async (
  showToast,
  userDataDispatch,
  token,
  video
) => {
  try {
    const {
      data: { history },
    } = await axios.post(
      `/api/user/history`,
      { video: video },
      {
        headers: { authorization: token },
      }
    );
    userDataDispatch({ type: "UPDATE_HISTORY", payload: history });
  } catch (error) {
    showToast("error", "Couldn't add video to history. Try again later.");
  }
};

const removeFromHistory = async (
  showToast,
  userDataDispatch,
  token,
  videoId
) => {
  try {
    const {
      data: { history },
    } = await axios.delete(`/api/user/history/${videoId}`, {
      headers: { authorization: token },
    });
    userDataDispatch({ type: "UPDATE_HISTORY", payload: history });
  } catch (error) {
    showToast("error", "Couldn't remove video from history. Try again later.");
  }
};


const clearHistory = async (
  showToast,
  token,
  userDataDispatch
) => {
  try {
    const {
      data: { history },
    } = await axios.delete(
      `/api/user/history/all`,
      {
        headers: { authorization: token },
      }
    );
    userDataDispatch({ type: "UPDATE_HISTORY", payload: history });
    showToast("success", "Cleared history successfully.");
  } catch (error) {
    showToast("error", "Couldn't clear history. Try again later.");
  }
};


export { addToHistory, removeFromHistory, clearHistory };
