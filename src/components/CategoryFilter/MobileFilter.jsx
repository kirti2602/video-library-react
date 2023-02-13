import { useState } from "react";
import { useCategory, useVideos } from "contexts";
import { FilterAltIcon } from "assets";

const MobileFilter = () => {
  const {
    categoryState: { categories },
  } = useCategory();
  const [showFilter, setShowFilter] = useState(false);

  const { selectedCategory, videosDispatch } = useVideos();

  const selectCatgHandler = (categoryName) => {
    if (categoryName === "All") {
      videosDispatch({ type: "CLEAR_CATEGORY", payload: categoryName });
    } else {
      videosDispatch({ type: "SELECT_CATEGORY", payload: categoryName });
    }
    setShowFilter(!showFilter);
  };
  return (
    <div className="mx-5 mt-2 p-3 mobile-filter-container">
      <button
        className="button button-primary btn-solid mobile-filter-toggle"
        onClick={() => setShowFilter(!showFilter)}
      >
        <FilterAltIcon />
        Filters
      </button>
      {showFilter && (
        <div className="flex-col mobile-filter-btns">
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
      )}
    </div>
  );
};

export default MobileFilter;
