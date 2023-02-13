import { NavigationSide } from "components";
import { VideoCard } from "components";
import { useUserData } from "contexts";

const LikedPage = () => {
  const {
    userDataState: { likedVideos },
  } = useUserData();

  return (
    <section className="video-main-content">
      <div className="video-grid-item">
        <NavigationSide />
      </div>
      <main className="video-grid-item" id="video-main">
        <h5 className="h5 px-8 pt-8 text-center">
          Liked Videos: {likedVideos?.length}
        </h5>

        {likedVideos.length > 0 ? (
          <section className="video-container">
            {likedVideos.map((video) => {
              return <VideoCard video={video} key={video._id} />;
            })}
          </section>
        ) : (
          <div className="container-center">
            <div className="alert alert-container alert-error">
              You do not have any liked videos. Add to liked vidoes from the
              explore page.
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

export default LikedPage;
