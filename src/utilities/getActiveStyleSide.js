const getActiveStyleSide = ({ isActive }) => ({
    backgroundColor: isActive ? "var(--theme-dark-hamburger-bg)" : "",
    color: isActive ? "var(--video-secondary-light)" : "",
    borderBottom: isActive ? "2px solid var(--video-secondary-color)" : "",
});

export { getActiveStyleSide };  