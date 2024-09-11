import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchGalleryItems,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
} from '../actions/galleryActions';

const ManageGallery = () => {
    const dispatch = useDispatch();
    const galleryItems = useSelector((state) => state.galleryItems.galleryItems);

    const [newItem, setNewItem] = useState({
        image: '',
        text: '',
        subText: '',
        color: '',
        category:'',
        isMedium: false,
        isLarge: false,
    });

    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        dispatch(fetchGalleryItems());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setNewItem({
            ...newItem,
            [name]: fieldValue,
        });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setEditItem({
            ...editItem,
            [name]: fieldValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editItem) {
            dispatch(updateGalleryItem(editItem._id, editItem));
            setEditItem(null);
        } else {
            dispatch(createGalleryItem(newItem));
            setNewItem({
                image: '',
                text: '',
                subText: '',
                color: '',
                category:'',
                isMedium: false,
                isLarge: false,
            });
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteGalleryItem(id));
        }
    };

    return (
        <div className="manage-gallery-container">
            <h1 className="text-2xl font-bold mb-4">Manage Gallery</h1>

            {/* Create/Edit Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={editItem ? editItem.image : newItem.image}
                        onChange={editItem ? handleEditChange : handleChange}
                        className="border p-2 mb-2 w-full"
                    />
                </div>
                <div>
                    <label>Text:</label>
                    <input
                        type="text"
                        name="text"
                        value={editItem ? editItem.text : newItem.text}
                        onChange={editItem ? handleEditChange : handleChange}
                        className="border p-2 mb-2 w-full"
                    />
                </div>
                <div>
                    <label>Sub Text:</label>
                    <input
                        type="text"
                        name="subText"
                        value={editItem ? editItem.subText : newItem.subText}
                        onChange={editItem ? handleEditChange : handleChange}
                        className="border p-2 mb-2 w-full"
                    />
                </div>
                <div>
                    <label>Text Color:</label>
                    <input
                        type="text"
                        name="color"
                        value={editItem ? editItem.color : newItem.color}
                        onChange={editItem ? handleEditChange : handleChange}
                        className="border p-2 mb-2 w-full"
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={editItem ? editItem.category : newItem.category}
                        onChange={editItem ? handleEditChange : handleChange}
                        className="border p-2 mb-2 w-full"
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="isMedium"
                            checked={editItem ? editItem.isMedium : newItem.isMedium}
                            onChange={editItem ? handleEditChange : handleChange}
                        />
                        Medium Size
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="isLarge"
                            checked={editItem ? editItem.isLarge : newItem.isLarge}
                            onChange={editItem ? handleEditChange : handleChange}
                        />
                        Large Size
                    </label>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
                    {editItem ? 'Update' : 'Create'}
                </button>
            </form>

            {/* Gallery Items List */}
            <div className="grid grid-cols-4 gap-4 py-4">
                {galleryItems.map((item) => (
                    <div key={item._id} className="relative border p-4 bg-gray-100">
                        <div className={`${item.color} rounded-lg overflow-hidden p-4 text-white`}
                            style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <h2 className="text-xl font-semibold">{item.text}</h2>
                            <p>{item.subText}</p>
                        </div>
                        <div className="absolute top-0 right-0">
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-yellow-500 text-white p-2 m-1"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-500 text-white p-2 m-1"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageGallery;
