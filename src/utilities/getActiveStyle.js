const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "var(--video-dark-grey)" : "",
    borderBottom: isActive ? "2px solid var(--video-dark-grey)" : "",
});

export { getActiveStyle };  