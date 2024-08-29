import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../actions/productActions';
import { fetchCategories } from '../actions/categoryActions';

const ProductManager = () => {
  const [product, setProduct] = useState({
    name: '',
    imageURL: '',
    subImages: [],
    unitPrice: '',
    description: '',
    video: '',
    category: '',
    subCategory: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [newSubImage, setNewSubImage] = useState('');

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);
  const { categories = [] } = useSelector(state => state.categories);
  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (product.category) {
      const selectedCat = categories.find(cat => cat._id === product.category);
      setSelectedCategory(selectedCat ? (Array.isArray(selectedCat.subCategories) ? selectedCat.subCategories : []) : []);
    }
  }, [product.category, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setProduct(prevProduct => ({
      ...prevProduct,
      category: categoryId,
      subCategory: ''
    }));

    const selectedCat = categories.find(cat => cat._id === categoryId);
    setSelectedCategory(selectedCat ? (Array.isArray(selectedCat.subCategories) ? selectedCat.subCategories : []) : []);
  };

  const handleSubImageChange = (e) => {
    setNewSubImage(e.target.value);
  };

  const addSubImage = () => {
    if (newSubImage) {
      setProduct(prevProduct => ({
        ...prevProduct,
        subImages: [...prevProduct.subImages, newSubImage]
      }));
      setNewSubImage('');
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
        name: '',
        imageURL: '',
        subImages: [],
        unitPrice: '',
        description: '',
        video: '',
        category: '',
        subCategory: '',
      });
      setIsEditing(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

  const handleEdit = (product) => {
    setProduct(product);
    setIsEditing(true);
    setEditingId(product._id);
    setSelectedCategory(categories.find(cat => cat._id === product.category)?.subCategories || []);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
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
        <select
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          {categories.length > 0 && categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.category}
            </option>
          ))}
        </select>
        <select
          name="subCategory"
          value={product.subCategory}
          onChange={handleChange}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        >
          <option value="">Select Subcategory</option>
          {selectedCategory.length > 0 && selectedCategory.map(sub => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
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
            <li key={index} className="border-b py-1">{img}</li>
          ))}
        </ul>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>
      <h2 className="text-xl font-bold mb-2">Products List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul className="list-disc pl-5">
          {products.map((product) => (
            <li key={product._id} className="mb-2 flex items-center">
              <span className="flex-1">{product.name}</span>
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductManager;
