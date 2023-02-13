import { useCategory, useVideos } from "contexts";

const CategoryFilter = () => {
  const {
    categoryState: { categories },
  } = useCategory();

  const { selectedCategory, videosDispatch } = useVideos();

  const selectCatgHandler = (categoryName) => {
    if (categoryName === "All") {
      videosDispatch({ type: "CLEAR_CATEGORY", payload: categoryName });
    } else {
      videosDispatch({ type: "SELECT_CATEGORY", payload: categoryName });
    }
  };

  return (
    <div className="mx-5 mt-2 p-3 category-filter">
      {categories.map(({ _id, categoryName }) => (
        <div
          key={_id}
          className={
            selectedCategory === categoryName
              ? "button button-primary btn-outline catg-selected reset-btn-hover"
              : "button button-primary btn-outline reset-btn-hover"
          }
          onClick={() => selectCatgHandler(categoryName)}
        >
          {categoryName}
        </div>
      ))}
      <div
        className="button button-primary btn-outline reset-catg reset-btn-hover"
        onClick={() => selectCatgHandler("All")}
      >
        Clear
      </div>
    </div>
  );
};

export default CategoryFilter;
