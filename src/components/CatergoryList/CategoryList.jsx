import { Link } from "react-router-dom";
import { useCategory, useVideos } from "contexts";
import "./category-list.css";

const CategoryList = () => {
  const { categoryState } = useCategory();
  const { selectedCategory, videosDispatch } = useVideos();

  const selectCatgHandler = (categoryName) => {
    videosDispatch({ type: "CLEAR_CATEGORY", payload: categoryName });
    videosDispatch({ type: "SELECT_CATEGORY", payload: categoryName });
  };

  return (
    <div className="categories-container mt-7">
      {categoryState.categories.map((category) => {
        const { _id, categoryImg, categoryName } = category;
        return (
          <div key={_id}>
            <Link
              to="/explore"
              className="link-no-decor router-link"
              onClick={() => selectCatgHandler(categoryName)}
            >
              <div className="card card-vertical ecomm-card card-shadow p-3">
                <div className="img-badge-container">
                  <img
                    src={categoryImg}
                    alt="sunscreen sample"
                    className="img-responsive vt-card-img"
                  />
                </div>
                <div className="vt-card-text">
                  <p className="ecomm-card-heading">{categoryName}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;
