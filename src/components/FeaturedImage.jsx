import { Link } from "react-router-dom"; // Adjust based on routing library

const FeaturedImage = () => {
  const imageUrl = "https://via.placeholder.com/800x600"; // Example image URL
  const tourText = "Take a tour"; // Text to display
  const buttonText = "Find your store"; // Button text
  const buttonLink = "/store"; // URL for the button link

  return (
    <div
      className="relative w-full flex justify-center p-4"
      style={{ marginTop: "2%", marginBottom: "2%" }}
    >
      <div className="relative w-4/5">
        <img
          src={imageUrl}
          alt="Featured"
          className=" h-auto object-cover rounded-lg"
        />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-lg mb-2">{tourText}</div>
          <Link to={buttonLink}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedImage;
