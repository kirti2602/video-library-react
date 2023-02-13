import { NavLink } from "react-router-dom";
import { getActiveStyleSide } from "utilities";
import {
	ExploreOutlined,
	VideoLibraryOutlined,
	FavoriteBorderOutlined,
	WatchLaterOutlined,
	HistoryOutlined,
} from "assets";
import "./navigation-side.css";

const NavigationSide = () => {
  return (
    <div className="sidebar" id="video-sidebar">
      <div className="sidebar-links mt-8">
        <NavLink to="/explore" style={getActiveStyleSide}><ExploreOutlined />Explore</NavLink>
        <NavLink to="/playlists" style={getActiveStyleSide}><VideoLibraryOutlined />Playlist</NavLink>
        <NavLink to="/liked-videos" style={getActiveStyleSide}><FavoriteBorderOutlined />Liked</NavLink>
        <NavLink to="/watch-later" style={getActiveStyleSide}><WatchLaterOutlined />Watch Later</NavLink>
        <NavLink to="/history" style={getActiveStyleSide}><HistoryOutlined />History</NavLink>
      </div>
    </div>
  );
};

export default NavigationSide;
