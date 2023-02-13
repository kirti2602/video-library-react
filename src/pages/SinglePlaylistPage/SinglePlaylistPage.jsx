import { useParams } from "react-router-dom";
import { NavigationSide } from "components";
import { useUserData } from "contexts";
import { PlaylistVideos } from "components";

const SinglePlaylistPage = () => {
  const playlistId = useParams("playlistId").playlistId;
  const {
    userDataState: { playlists },
  } = useUserData();

  const playlist = playlists.find((item) => item._id === playlistId);

  return (
    <section className="video-main-content">
      <div className="video-grid-item">
        <NavigationSide />
      </div>
      <main className="video-grid-item" id="video-main">
        {!playlist ? null : (
          <>
            <h3 className="h3 px-8 pt-8 text-center">
              Playlist: {playlist.title}
            </h3>
            {playlist.videos.length > 0 ? (
              <section className="video-container">
                {playlist.videos.map((video) => {
                  return (
                    <PlaylistVideos
                      video={video}
                      playlistId={playlist._id}
                      key={video._id}
                    />
                  );
                })}
              </section>
            ) : (
              <div className="container-center">
                <div className="alert alert-container alert-error">
                  You do not have any videos in this playlist. Add from Explore Page.
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </section>
  );
};

export default SinglePlaylistPage;
