import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import {
  HomePage,
  InvalidPage,
  LoginPage,
  SignupPage,
  HistoryPage,
  ExplorePage,
  LikedPage,
  WatchLaterPage,
  PlaylistPage,
  SinglePlaylistPage,
  SingleVideoPage,
} from "pages";
import PrivateRoutes from "./PrivateRoutes";

const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<InvalidPage />} />
      <Route path="/mockman" element={<Mockman />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/video/:videoId" element={<SingleVideoPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/playlists" element={<PlaylistPage />} />
        <Route path="/playlists/:playlistId" element={<SinglePlaylistPage />} />
        <Route path="/watch-later" element={<WatchLaterPage />} />
        <Route path="/liked-videos" element={<LikedPage />} />
      </Route>
    </Routes>
  );
};

export default SiteRoutes;
