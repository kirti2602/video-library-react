import axios from "axios";
import { useToast } from "custom-hooks";

const fetchSingleVideo = async (videoId, setSingleVideo) => {
  const { showToast } = useToast();
  try {
    const {
      data: { video },
    } = await axios.get(`/api/video/${videoId}`);
    setSingleVideo(video);
  } catch (error) {
      showToast("error", "Can't fetch the video, try again later.")
  }
};

export { fetchSingleVideo };