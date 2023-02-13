import { useState } from "react";
import { AddIcon, CloseIcon } from "assets";
import { useUserData, useAuth } from "contexts";
import { useToast } from "custom-hooks";
import { addNewPlaylist, removeFromPlaylist, addToPlaylist } from "utilities";
import "./playlist-modal.css";

const PlaylistModal = ({ setTogglePlaylistModal }) => {
  const {
    userDataState: { playlists },
    userDataDispatch,
    currentVideo,
  } = useUserData();
  const {
    auth: { token },
  } = useAuth();
  const { showToast } = useToast();

  const [newPlaylist, setNewPlaylist] = useState("");

  const createPlaylistHandler = (e) => {
    e.preventDefault();
    const createdTitle = newPlaylist.trim();

    if (
      playlists.some(
        (playlist) =>
          playlist.title.toLowerCase() === createdTitle.toLowerCase()
      )
    ) {
      showToast(
        "error",
        `Playlist with the same name '${createdTitle}' already exists`
      );
      return;
    }

    if (createdTitle.length === 0) {
      showToast("error", "Playlist title can't be empty!");
      return;
    }

    addNewPlaylist(showToast, newPlaylist, token, userDataDispatch);
    setNewPlaylist("");
  };

  const PlayListItem = ({ playlist, videoId }) => {
    const isVideoInPlaylist = playlist.videos.some(
      (vid) => vid._id === videoId
    );

    const removeVideoPlaylistHandler = () => {
      removeFromPlaylist(
        showToast,
        userDataDispatch,
        token,
        playlist._id,
        currentVideo._id
      );
    };

    const addVideoPlaylistHandler = () => {
      addToPlaylist(
        showToast,
        userDataDispatch,
        token,
        playlist._id,
        currentVideo
      );
    };

    return (
      <label>
        <input
          type="checkbox"
          onChange={
            isVideoInPlaylist
              ? removeVideoPlaylistHandler
              : addVideoPlaylistHandler
          }
          checked={isVideoInPlaylist}
        />
        {playlist.title}
      </label>
    );
  };

  return (
    <div className="playlist-modal-demo-wrapper">
      <div className="playlist-modal-container p-3">
        <h4 className="h4">Choose Playlist</h4>
        <button
          className="playlist-modal-close"
          onClick={() => setTogglePlaylistModal(false)}
        >
          <CloseIcon />
        </button>
        <ul>
          {playlists.map((playlist) => (
            <li className="playlist-item" key={playlist._id}>
              <PlayListItem playlist={playlist} videoId={currentVideo._id} />
            </li>
          ))}
        </ul>

        <h4 className="h4">Create New Playlist</h4>
        <div className="create-new-playlist flex-row my-3">
          <input
            type="text"
            placeholder="Add title..."
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
          />
          <button className="mx-1" onClick={createPlaylistHandler}>
            <AddIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
