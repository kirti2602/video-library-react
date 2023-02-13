const searchVideos = (videos, searchQuery) => {
  return videos.filter((video) =>
    searchQuery ? video.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
};

export { searchVideos };
