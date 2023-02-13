const checkVideoInWatchLater = (videoId, watchlater) => {
  return watchlater.some(({ _id }) => _id === videoId);
};

export { checkVideoInWatchLater };
