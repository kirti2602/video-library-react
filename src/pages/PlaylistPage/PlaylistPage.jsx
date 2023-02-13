import { useState } from "react";
import { AddIcon } from "assets";
import { PlaylistCard, NavigationSide } from "components";
import { useUserData, useAuth } from "contexts";
import { useToast } from "custom-hooks";
import { addNewPlaylist } from "utilities";
import "./playlist-page.css";

const PlaylistPage = () => {
  const {
    userDataState: { playlists },
    userDataDispatch,
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

  return (
    <section className="video-main-content">
      <div className="video-grid-item">
        <NavigationSide />
      </div>
      <main className="video-grid-item" id="video-main">
        <div className="create-new-playlist flex-row my-3 pt-8">
          <input
            type="text"
            placeholder="Create New Playlist..."
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
          />
          <button
            className="mx-1 add-playlist-page"
            onClick={createPlaylistHandler}
          >
            <AddIcon style={{ fontSize: 28 }} />
          </button>
        </div>

        {playlists.length > 0 ? (
          <section className="flex-cards">
            {playlists.map((playlist) => {
              return <PlaylistCard playlist={playlist} key={playlist._id} />;
            })}
          </section>
        ) : (
          <div className="container-center">
            <div className="alert alert-container alert-error">
              You do not have any playlists. Create new playlists above or from
              the explore page.
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

export default PlaylistPage;
