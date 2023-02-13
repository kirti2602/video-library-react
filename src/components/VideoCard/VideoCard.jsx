import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MoreVertOutlinedIcon,
  PlaylistAddIcon,
  ThumbUpIcon,
  ThumbUpOutlinedIcon,
  CheckCircleIcon,
  CloseIcon,
  DeleteIcon,
  WatchLaterOutlined,
} from "assets";
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
  removeFromHistory,
} from "utilities";
import "./video-card.css";

const VideoCard = ({ video }) => {
  const {
    _id,
    thumbnail,
    title,
    creatorAvatar,
    creator,
    duration,
    views,
    category,
  } = video;

  const navigate = useNavigate();
  let location = useLocation();
  const [dropDown, setDropDown] = useState(false);
  const {
    auth: { isAuth, token },
  } = useAuth();
  const { showToast } = useToast();
  const { userDataState, userDataDispatch, setCurrentVideo } = useUserData();
  const [isVideoLiked, setIsVideoLiked] = useState(
    checkVideoInLiked(_id, userDataState.likedVideos)
  );
  const [isVideoInWatchLater, setIsVideoInWatchLater] = useState(
    checkVideoInWatchLater(_id, userDataState.watchlater)
  );
  const [togglePlaylistModal, setTogglePlaylistModal] = useState(false);

  const openSingleVideo = () => {
    navigate(`/video/${_id}`);
  };

  useEffect(() => {
    if (isAuth) {
      setIsVideoLiked(checkVideoInLiked(_id, userDataState.likedVideos));
      setIsVideoInWatchLater(
        checkVideoInWatchLater(_id, userDataState.watchlater)
      );
    }
  }, [userDataState]);

  useEffect(() => {
    return () => {
      setDropDown(false);
    };
  }, []);

  const likeClickHandler = (e) => {
    e.preventDefault();

    if (!isAuth) {
      showToast("error", "Login to add the video to your liked videos.");
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      isVideoLiked
        ? removeFromLiked(showToast, userDataDispatch, token, _id)
        : addToLiked(showToast, userDataDispatch, token, video);
    }
  };

  const watchLaterHandler = (e) => {
    e.preventDefault();

    if (!isAuth) {
      showToast("error", "Login to add the video to watch later.");
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      isVideoInWatchLater
        ? removeFromWatchLater(showToast, userDataDispatch, token, _id)
        : addToWatchLater(showToast, userDataDispatch, token, video);
    }
  };

  const playlistHandler = (e) => {
    e.preventDefault();

    if (!isAuth) {
      showToast("error", "Login to add videos to playlists.");
      navigate("/login", { state: { from: location }, replace: true });
    } else setTogglePlaylistModal(true);
  };

  const removeFromHistoryHandler = (e) => {
    e.preventDefault();
    removeFromHistory(showToast, userDataDispatch, token, _id);
  };

  setTimeout(() => {
    if (dropDown) setDropDown(false);
  }, 5000);

  return (
    <>
      {togglePlaylistModal ? (
        <PlaylistModal setTogglePlaylistModal={setTogglePlaylistModal} />
      ) : null}
      <div className="card card-vertical card-shadow" id={_id}>
        <div className="p-3 img-badge-container" onClick={openSingleVideo}>
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="img-responsive vt-card-img"
          />
        </div>
        <div className="vt-card-text">
          <div className="video-card-head">
            <img
              src={creatorAvatar}
              alt="Small Avatar"
              className="avatar avatar-sm"
            />
            <div className="px-2">
              <h2>{title}</h2>
              <p className="card-brand-name my-2">{creator}</p>
              <span className="rating d-inline">
                {views} views
                <span className="text-small"> • {duration}</span>
              </span>
            </div>
          </div>
          <div className="card-price">
            <span className="alert-container alert-primary txt-small category-tag">
              {category}
            </span>
            <button
              className="button btn-solid button-primary reset-btn-hover"
              onClick={() => {
                setDropDown(!dropDown);
                setCurrentVideo(video);
              }}
            >
              <MoreVertOutlinedIcon />
            </button>
            {dropDown && location.pathname !== "/history" && (
              <div className="flex-row p-3 drop-down">
                <div>
                  {isVideoInWatchLater ? (
                    <button className="m-1 mt-3" onClick={watchLaterHandler}>
                      <span className="mx-2">
                        <CheckCircleIcon />
                      </span>
                      Remove from Watch Later
                    </button>
                  ) : (
                    <button className="m-1" onClick={watchLaterHandler}>
                      <span className="mx-2">
                        <WatchLaterOutlined />
                      </span>
                      Watch Later
                    </button>
                  )}
                  <button className="m-1" onClick={playlistHandler}>
                    <span className="mx-2">
                      <PlaylistAddIcon />
                    </span>
                    Add to playlist
                  </button>
                  {isVideoLiked ? (
                    <button className="m-1" onClick={likeClickHandler}>
                      <span className="mx-2">
                        <ThumbUpIcon />
                      </span>
                      Remove from Liked Videos
                    </button>
                  ) : (
                    <button className="m-1" onClick={likeClickHandler}>
                      <span className="mx-2">
                        <ThumbUpOutlinedIcon />
                      </span>
                      Add to Liked Videos
                    </button>
                  )}
                </div>
                <button
                  className="m-1 close-dropdown"
                  onClick={() => setDropDown(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            {location.pathname === "/history" && dropDown && (
              <div className="flex-row p-3 drop-down">
                <div>
                  <button className="m-1" onClick={removeFromHistoryHandler}>
                    <span className="mx-2">
                      <DeleteIcon />
                    </span>
                    Remove from history
                  </button>
                </div>
                <button className="m-1" onClick={() => setDropDown(false)}>
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
