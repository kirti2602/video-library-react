const checkVideoInLiked = (videoId, likedVideos) => {
  return likedVideos.some(({ _id }) => _id === videoId);
};

export { checkVideoInLiked };
