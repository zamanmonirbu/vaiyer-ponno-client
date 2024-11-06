// src/services/imageService.js
const IMG_BB_API_URL = "https://api.imgbb.com/1/upload";
const API_KEY = "13c60fa1ef34d09a7e455348d706165b"; 

export const uploadImageToImgBB = async (imageFile, imageName) => {
  const formData = new FormData();

  // Rename the image with the provided imageName
  formData.append("image", imageFile);
  formData.append("name", imageName); // Add name parameter for imgbb

  console.log(formData)

  try {
    const response = await fetch(`${IMG_BB_API_URL}?key=${API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      return result.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
