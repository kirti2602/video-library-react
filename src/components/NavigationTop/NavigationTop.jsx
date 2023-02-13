import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { darkLogo, lightLogo, DarkMode, LightMode, Menu } from "assets";
import { useTheme, useAuth } from "contexts";
import { useToast } from "custom-hooks";
import { getActiveStyle } from "utilities";
import { SearchBar } from "components";
import "./navigation-top.css";

const NavigationTop = () => {
  const { theme, setTheme } = useTheme();
  const { auth, setAuth } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const signOutFunc = () => {
    localStorage.removeItem("AUTH_TOKEN");
    localStorage.removeItem("user");
    setAuth({
      isAuth: false,
      token: null,
      user: {},
    });
    showToast("success", "Logged out.");
    navigate("/", { replace: true });
  };

  const changeTheme = () =>
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    localStorage.setItem("halcyon-gaming-theme", theme);
  }, [theme]);

  useEffect(() => {
    setHamburgerOpen(false);
  }, [location]);

  return (
    <header id="header">
      <nav className="store-nav-bar">
        <div className="store-logo-box">
          <NavLink to="/">
            {theme === "dark" ? (
              <img src={darkLogo} alt="logo" className="store-logo" />
            ) : (
              <img src={lightLogo} alt="logo" className="store-logo" />
            )}
          </NavLink>
        </div>
        <button
          className="video-hamburger-btn"
          onClick={() => {
            setHamburgerOpen(!hamburgerOpen);
          }}
        >
          <Menu />
        </button>
        <div
          className={hamburgerOpen ? "store-nav hamburger-open" : "store-nav"}
        >
          <ul className="store-nav-links ul-no-decor display-flex">
            {location.pathname === "/explore" && <SearchBar />}
            <li>
              <NavLink
                to="/"
                style={getActiveStyle}
                className="button button-primary button-link active reset-btn-hover"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/explore"
                style={getActiveStyle}
                className="button button-primary button-link reset-btn-hover"
              >
                Explore
              </NavLink>
            </li>

            {auth.isAuth === true ? (
              <>
                <div className="sidebar-links">
                  <li>
                    <NavLink
                      to="/playlists"
                      style={getActiveStyle}
                      className="button button-primary button-link"
                    >
                      Playlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/liked-videos"
                      style={getActiveStyle}
                      className="button button-primary button-link"
                    >
                      Liked
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/watch-later"
                      style={getActiveStyle}
                      className="button button-primary button-link"
                    >
                      Watch Later
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/history"
                      className="button button-primary button-link"
                    >
                      History
                    </NavLink>
                  </li>
                </div>
                <li>
                  <button className="btn btn-logout" onClick={signOutFunc}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  style={getActiveStyle}
                  className="button button-primary button-link reset-btn-hover"
                >
                  <i className="fas fa-user"></i>Login
                </NavLink>
              </li>
            )}

            <li>
              <button
                className="button button-primary button-link theme-btn reset-btn-hover"
                onClick={changeTheme}
              >
                {theme === "dark" ? <DarkMode /> : <LightMode />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavigationTop;
