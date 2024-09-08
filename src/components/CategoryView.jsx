import { useEffect } from "react";
import { fetchCategories } from "../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";


const CategoryView = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  // const loading = useSelector((state) => state.categories.loading);
  // const error = useSelector((state) => state.categories.error);


  console.log("Category",categories)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="border p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">{category.category}</h3>
            <ul className="ml-4 mt-2">
              {category.subCategories.map((subCategory, subIndex) => (
                <li key={subIndex} className="mb-2">
                  <span className="font-medium">{subCategory.name}</span>
                  {subCategory.subSubCategories &&
                    subCategory.subSubCategories.length > 0 && (
                      <ul className="ml-4 mt-1">
                        {subCategory.subSubCategories.map(
                          (subSubCategory, subSubIndex) => (
                            <li key={subSubIndex}>{subSubCategory}</li>
                          )
                        )}
                      </ul>
                    )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryView;
