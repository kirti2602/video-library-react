import { useNavigate } from "react-router-dom";
import { CancelScheduleSendIcon, DeleteIcon } from "assets";
import { deletePlaylist } from "utilities";
import { useAuth, useUserData } from "contexts";
import { useToast } from "custom-hooks";
import "./playlist-card.css";

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    auth: { token },
  } = useAuth();
  const { userDataDispatch } = useUserData();

  const openPlayListHandler = (playlistId) => {
    navigate(`/playlists/${playlistId}`);
  };

  const deletePlaylistHandler = (playlistId) => {
    deletePlaylist(showToast, token, userDataDispatch, playlistId);
  };

  return (
    <>
      {playlist.videos.length === 0 ? (
        <>
          <div className="playlist-container playlist-empty">
            <div
              className="playlist-img"
              onClick={() => openPlayListHandler(playlist._id)}
            >
              <CancelScheduleSendIcon style={{ fontSize: 50 }} />
            </div>
            <p className="playlist-empty-title">Playlist is empty</p>
            <p className="playlist-title-btns my-4 p-1">
              {playlist.title}
              <button
                className="m-1"
                onClick={() => deletePlaylistHandler(playlist._id)}
              >
                <span className="mx-2">
                  <DeleteIcon />
                </span>
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="playlist-container">
            <div
              className="playlist-img"
              onClick={() => openPlayListHandler(playlist._id)}
            >
              <img
                src={`http://i1.ytimg.com/vi/${playlist.videos[0]._id}/0.jpg`}
                className="playlist-preview"
              />
              <div className="video-count">
                <p>{playlist.videos.length}</p>
              </div>
            </div>
            <p className="playlist-title-btns my-2 p-1">
              {playlist.title}
              <button
                className="m-1"
                onClick={() => deletePlaylistHandler(playlist._id)}
              >
                <span className="mx-2">
                  <DeleteIcon />
                </span>
              </button>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default PlaylistCard;
