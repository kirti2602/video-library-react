const filterVideos = (videos, selectedCategory) => {
  return videos.filter((video) =>
    selectedCategory !== "" && selectedCategory !== "All"
      ? video.category === selectedCategory
      : true
  );
};

export { filterVideos };
