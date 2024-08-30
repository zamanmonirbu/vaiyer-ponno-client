import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAdmins, acceptAdmin, rejectAdmin } from '../../actions/adminActions';
import StrikeLine from '../StrikeLine';

const AdminRequests = () => {
  const dispatch = useDispatch();

  const adminRequestsState = useSelector((state) => state.adminRequests);
  const { loading, requests, error } = adminRequestsState;

  useEffect(() => {
    dispatch(requestAdmins());
  }, [dispatch]);

  const handleAccept = (id) => {
    dispatch(acceptAdmin(id));
  };

  const handleReject = (id) => {
    dispatch(rejectAdmin(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Admin Requests</h1>
      {loading && <p>Loading requests...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {requests.length === 0 && <p>No pending requests.</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 border-r">Name</th>
            <th className="p-2 border-r">Email</th>
            <th className="p-2 border-r">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="border-b">
              <td className="p-2 border-r">{request.name}</td>
              <td className="p-2 border-r">{request.email}</td>
              <td className="p-2 text-center border-r">
                <button
                  onClick={() => handleAccept(request._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
              <td className="p-2 border-r">
                <StrikeLine />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequests;
