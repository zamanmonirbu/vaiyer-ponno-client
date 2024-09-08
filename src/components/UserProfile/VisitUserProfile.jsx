import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../actions/userActions";
import { useParams } from "react-router-dom";
import AllNavSections from "../AllNavSections";

const VisitUserProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch, userId]);

  const { userProfile, loading, error } = useSelector((state) => state.user);
  return (
    <>
      <AllNavSections />
      <div className={`flex justify-center`}>
        <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden my-4 p-6 mx-auto">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="flex items-center justify-center p-4">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  src={userProfile?.image || "https://via.placeholder.com/150"}
                  alt={userProfile?.name}
                />
              </div>
              <div className="p-4">
                <h1 className="text-center text-2xl font-bold mb-4">
                  {userProfile?.name} Profile
                </h1>
                <table className="table-auto w-full text-left border">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Name:</td>
                      <td className="px-4 py-2">{userProfile?.name}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Email:</td>
                      <td className="px-4 py-2">{userProfile?.email}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2 font-semibold">Address:</td>
                      <td className="px-4 py-2">
                        {userProfile?.address || "No address available"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VisitUserProfile;
