import { useEffect, useState } from "react";
import { NavigationSide } from "components";
import { Loader } from "assets";
import { VideoCard, CategoryFilter, MobileFilter } from "components";
import { useVideos } from "contexts";
import "./explore-page.css";

const ExplorePage = () => {
  const { videosLoading, videos } = useVideos();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    return () => {
      setLoader(true);
    };
  }, []);

  setTimeout(() => {
    if (!videosLoading) setLoader(videosLoading);
  }, 1000);

  const loadingVideosMsg = (
    <div className="mt-6 loader-container">
        <img src={Loader} alt="Loading Videos" className="videos-loader"/>
    </div>
  );
  return (
    <section className="video-main-content">
      <div className="video-grid-item">
        <NavigationSide />
      </div>
      {loader ? (
        loadingVideosMsg
      ) : (
        <>
          <main className="video-grid-item" id="video-main">
            <CategoryFilter />
            <MobileFilter />
            <section className="video-container">
              {videos.map((video) => {
                return <VideoCard video={video} key={video._id} />;
              })}
            </section>
          </main>
        </>
      )}
    </section>
  );
};

export default ExplorePage;
