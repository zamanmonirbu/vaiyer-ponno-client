import { useState } from "react";

const AboutCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", description: "All products available in our store." },
    {
      name: "Category 1",
      description:
        "Description about Category 1 products. These are the best products you can find in this category.",
    },
    {
      name: "Category 2",
      description:
        "Description about Category 2 products. High-quality and reliable items in this section.",
    },
    {
      name: "Category 3",
      description:
        "Description about Category 3 products. Exclusive selections with great features.",
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 ">
        All my products that is for you
      </h2>

      {/* Strike Line */}
      <hr className="border-t-2 border-gray-300 mb-4" />

      {/* Product Categories */}
      <div className="flex justify-center space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`py-2 px-4 rounded ${
              selectedCategory === category.name
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Strike Line */}
      <hr className="border-t-2 border-gray-300 mb-4" />

      {/* About Selected Category */}
      <div>
        {categories.map(
          (category) =>
            selectedCategory === category.name && (
              <div key={category.name} className="space-y-4">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-gray-700">{category.description}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default AboutCategory;
