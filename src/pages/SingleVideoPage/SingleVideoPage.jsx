import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { NavigationSide } from "components";
import {
  PlaylistAddIcon,
  ThumbUpIcon,
  ThumbUpOutlinedIcon,
  CheckCircleIcon,
  WatchLaterOutlined,
} from "assets";
import { fetchSingleVideo } from "utilities";
import { useToast } from "custom-hooks";
import { useAuth, useUserData } from "contexts";
import { PlaylistModal } from "components";
import {
  addToLiked,
  removeFromLiked,
  removeFromWatchLater,
  addToWatchLater,
  checkVideoInLiked,
  checkVideoInWatchLater,
  addToHistory,
} from "utilities";
import "./single-video.css";

const SingleVideoPage = () => {
  const { videoId } = useParams();
  const [singleVideo, setSingleVideo] = useState({});

  useEffect(() => {
    fetchSingleVideo(videoId, setSingleVideo);
  }, [videoId]);

  const {
    auth: { isAuth, token },
  } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  let location = useLocation();
  const { userDataState, userDataDispatch, setCurrentVideo } = useUserData();

  const isVideoLiked = checkVideoInLiked(
    singleVideo._id,
    userDataState.likedVideos
  );
  const isVideoInWatchLater = checkVideoInWatchLater(
    singleVideo._id,
    userDataState.watchlater
  );
  const [togglePlaylistModal, setTogglePlaylistModal] = useState(false);

  const likeClickHandler = (e) => {
    e.preventDefault();

    if (!isAuth) {
      showToast("error", "Login to add the video to your liked videos.");
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      isVideoLiked
        ? removeFromLiked(showToast, userDataDispatch, token, singleVideo._id)
        : addToLiked(showToast, userDataDispatch, token, singleVideo);
    }
  };

  const watchLaterHandler = (e) => {
    e.preventDefault();

    if (!isAuth) {
      showToast("error", "Login to add the video to watch later.");
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      isVideoInWatchLater
        ? removeFromWatchLater(
            showToast,
            userDataDispatch,
            token,
            singleVideo._id
          )
        : addToWatchLater(showToast, userDataDispatch, token, singleVideo);
    }
  };

  const playlistHandler = (e) => {
    setCurrentVideo(singleVideo);
    e.preventDefault();

    if (!isAuth) {
      showToast("error", "Login to add videos to playlists.");
      navigate("/login", { state: { from: location }, replace: true });
    } else setTogglePlaylistModal(true);
  };

  const recordHistoryHandler = () => {
    if (isAuth) {
      addToHistory(showToast, userDataDispatch, token, singleVideo);
    }
  };

  return (
    <>
      {togglePlaylistModal ? (
        <PlaylistModal setTogglePlaylistModal={setTogglePlaylistModal} />
      ) : null}
      <section className="video-main-content">
        <div className="video-grid-item">
          <NavigationSide />
        </div>
        <main className="video-grid-item m-5 p-2" id="video-main">
          <div className="single-video-player">
            <ReactPlayer
              url={`https://www.youtube.com/embed/${singleVideo._id}`}
              controls={true}
              height={"100%"}
              width={"100%"}
              onStart={recordHistoryHandler}
            />
          </div>
          <p className="h3 single-video-title my-4">{singleVideo.title}</p>
          <div className="single-video-btns my-2">
            {isVideoLiked ? (
              <button
                className="single-video-action"
                onClick={likeClickHandler}
              >
                <span className="mx-2">
                  <ThumbUpIcon />
                </span>
                Dislike
              </button>
            ) : (
              <button
                className="single-video-action"
                onClick={likeClickHandler}
              >
                <span className="mx-2">
                  <ThumbUpOutlinedIcon />
                </span>
                Like
              </button>
            )}
            {isVideoInWatchLater ? (
              <button
                className="single-video-action mx-2"
                onClick={watchLaterHandler}
              >
                <span className="mx-2">
                  <CheckCircleIcon />
                </span>
                Remove from Watch Later
              </button>
            ) : (
              <button
                className="single-video-action mx-2"
                onClick={watchLaterHandler}
              >
                <span className="mx-2">
                  <WatchLaterOutlined />
                </span>
                Watch Later
              </button>
            )}
            <button className="single-video-action" onClick={playlistHandler}>
              <span className="mx-2">
                <PlaylistAddIcon />
              </span>
              Add to playlist
            </button>
          </div>
          <p className="single-video-desc my-4">{singleVideo.description}</p>
        </main>
      </section>
    </>
  );
};

export default SingleVideoPage;
