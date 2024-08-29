import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  requestAdmins, acceptAdmin, rejectAdmin } from '../../actions/adminActions';
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
      <ul>
        {requests.map((request) => (
          <li key={request._id} className="flex justify-between items-center border-b py-2">
            <div>
              <p className="font-semibold">Name: {request.name}</p>
              <p>Email: {request.email}</p>
            </div>
            <div>
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
            </div>
            <StrikeLine/>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminRequests;
