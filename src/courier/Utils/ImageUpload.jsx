import { useState } from "react";
import { uploadImageToImgBB } from "../../actions/imageService";
import PropTypes from "prop-types"; // Import PropTypes

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImageUrl] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a 9-digit random number
      const randomNineDigitNumber = Math.floor(100000000 + Math.random() * 900000000);
      const newImageName = `${randomNineDigitNumber}-${file.name}`;

      // Upload image with the new image name
      const uploadedUrl = await uploadImageToImgBB(file, newImageName);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl); // Show uploaded image preview
        onImageUpload(uploadedUrl); // Pass URL back to parent for further actions
      } else {
        alert("Image upload failed. Please try again.");
      }
    }
  };

  return (
    <div className="text-center mb-4">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="block mx-auto mb-2" />
      {image && <img src={image} alt="Uploaded Preview" className="w-32 h-32 mx-auto rounded-full border" />}
    </div>
  );
};

// Prop validation
ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired, // Ensure onImageUpload is a required function
};

export default ImageUpload;
