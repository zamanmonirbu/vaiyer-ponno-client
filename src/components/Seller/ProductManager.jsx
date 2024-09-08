import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../actions/categoryActions";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getSellerProducts,
} from "../../actions/productActions";

const ProductManager = () => {
  const [product, setProduct] = useState({
    name: "",
    imageURL: "",
    subImages: [],
    unitPrice: "",
    description: "",
    video: "",
    category: "",
    subCategory: "",
    offer: "",
    gender: "", // Added gender field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [newSubImage, setNewSubImage] = useState("");

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { categories = [] } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getSellerProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (product.category) {
      const selectedCat = categories.find(
        (cat) => cat._id === product.category
      );
      setSelectedCategory(
        selectedCat && Array.isArray(selectedCat.subCategories)
          ? selectedCat.subCategories
          : []
      );
    }
  }, [product.category, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: categoryId,
      subCategory: "",
    }));

    const selectedCat = categories.find((cat) => cat._id === categoryId);
    setSelectedCategory(
      selectedCat && Array.isArray(selectedCat.subCategories)
        ? selectedCat.subCategories
        : []
    );
  };

  const handleSubImageChange = (e) => {
    setNewSubImage(e.target.value);
  };

  const addSubImage = () => {
    if (newSubImage) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        subImages: [...prevProduct.subImages, newSubImage],
      }));
      setNewSubImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await dispatch(updateProduct(editingId, product));
      } else {
        await dispatch(createProduct(product));
      }
      setProduct({
        name: "",
        imageURL: "",
        subImages: [],
        unitPrice: "",
        description: "",
        video: "",
        category: "",
        subCategory: "",
        offer: "",
        gender: "", // Reset gender field
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsEditing(true);
    setEditingId(product._id);
    setSelectedCategory(
      categories.find((cat) => cat._id === product.category)?.subCategories ||
        []
    );
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="imageURL"
          value={product.imageURL}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="unitPrice"
          value={product.unitPrice}
          onChange={handleChange}
          placeholder="Unit Price"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="video"
          value={product.video}
          onChange={handleChange}
          placeholder="Video URL"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="offer"
          value={product.offer}
          onChange={handleChange}
          placeholder="Offer"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
          required
        />
        <div className="mb-2">
          <span className="block mb-1">Gender</span>
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={product.gender === "Male"}
              onChange={handleChange}
              className="mr-1"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={product.gender === "Female"}
              onChange={handleChange}
              className="mr-1"
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="all"
              checked={product.gender === "All"}
              onChange={handleChange}
              className="mx-2"
            />
            All
          </label>
        </div>
        <select
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories?.length > 0 &&
            categories?.map((cat) => (
              <option key={cat?._id} value={cat?._id}>
                {cat?.name}
              </option>
            ))}
        </select>
        <select
          name="subCategory"
          value={product?.subCategory}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          <option value="">Select Subcategory</option>
          {selectedCategory?.length > 0 &&
            selectedCategory?.map((sub) => (
              <option key={sub?._id} value={sub?._id}>
                {sub?.name}
              </option>
            ))}
        </select>
        <input
          type="text"
          value={newSubImage}
          onChange={handleSubImageChange}
          placeholder="Add Sub Image URL"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={addSubImage}
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
        >
          Add Sub Image
        </button>
        <ul className="mb-2">
          {product.subImages.map((img, index) => (
            <li key={index} className="border-b py-1">
              {img}
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">Products List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Sub-Category</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Offer</th>
              <th className="py-2 px-4 border">Gender</th> {/* Added Gender */}
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="py-2 px-4 border">{product?.name}</td>
                <td className="py-2 px-4 border">
                  {categories?.find((cat) => cat?._id === product.category)
                    ?.name || "N/A"}
                </td>
                <td className="py-2 px-4 border">
                  {selectedCategory.find(
                    (sub) => sub._id === product.subCategory
                  )?.name || "N/A"}
                </td>
                <td className="py-2 px-4 border">{product?.unitPrice}</td>
                <td className="py-2 px-4 border">{product?.offer}</td>
                <td className="py-2 px-4 border">{product?.gender}</td>{" "}
                {/* Display Gender */}
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(product)}
                    className="mr-2 py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductManager;
