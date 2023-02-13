import { NavigationSide, VideoCard } from "components";
import { useUserData, useAuth } from "contexts";
import { useToast } from "custom-hooks";
import { clearHistory } from "utilities";

const HistoryPage = () => {
  const {
    auth: { token },
  } = useAuth();
  const {
    userDataState: { historyVideos },
    userDataDispatch,
  } = useUserData();
  const { showToast } = useToast();
  const clearHistoryHandler = (e) => {
    e.preventDefault();
    clearHistory(showToast, token, userDataDispatch);
  };

  return (
    <>
      <section className="video-main-content">
        <div className="video-grid-item">
          <NavigationSide />
        </div>
        <main className="video-grid-item" id="video-main">
          <div className="create-new-playlist flex-row my-3 pt-8">
            <button
              className="button btn-solid button-primary reset-btn-hover"
              onClick={clearHistoryHandler}
            >
              X Clear History
            </button>
          </div>

          {historyVideos.length > 0 ? (
            <section className="video-container">
              {historyVideos.map((video) => {
                return <VideoCard video={video} key={video._id} />;
              })}
            </section>
          ) : (
            <div className="container-center">
              <div className="alert alert-container alert-error">
                You do not have any recorded history. Make sure to login and
                start watching a video to record history.
              </div>
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default HistoryPage;
