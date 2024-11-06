import axiosInstance from "../api/axiosInstance";

export const getIpLocation = async () => {
  try {
    const response = await axiosInstance.get("https://ipinfo.io/json?token=8827a523064ec7");
    const locationData = response.data;
    

    // console.log(locationData);
    // Check if location data exists
    if (locationData && locationData.loc) {
      return locationData.loc; // Returns coordinates as "latitude,longitude"
    } else {
      console.error("Location data is unavailable in the response.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user location:", error);
    return null;
  }
};
