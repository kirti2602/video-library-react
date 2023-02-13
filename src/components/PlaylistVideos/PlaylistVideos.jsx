import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertOutlinedIcon, CloseIcon, DeleteIcon } from "assets";
import { useToast } from "custom-hooks";
import { useAuth, useUserData } from "contexts";
import { removeFromPlaylist } from "utilities";

const PlaylistVideos = ({ video, playlistId }) => {
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

  const [dropDown, setDropDown] = useState(false);
  const {
    auth: { token },
  } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { userDataDispatch, setCurrentVideo, currentVideo } = useUserData();

  const openSingleVideo = () => {
    navigate(`/video/${_id}`);
  };

  const removeFromPlaylistHandler = () => {
    removeFromPlaylist(
      showToast,
      userDataDispatch,
      token,
      playlistId,
      currentVideo._id
    );
  };

  return (
    <>
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
            {dropDown && (
              <div className="flex-row p-3 drop-down">
                <div>
                  <button className="m-1" onClick={removeFromPlaylistHandler}>
                    <span className="mx-2">
                      <DeleteIcon />
                    </span>
                    Remove from playlist
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

export default PlaylistVideos;
