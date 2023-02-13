import axios from "axios";

const fetchVideos = () => axios.get('/api/videos');

export { fetchVideos };