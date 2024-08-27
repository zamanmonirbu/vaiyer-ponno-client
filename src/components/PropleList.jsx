import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProple } from '../actions/propleActions';

const PropleList = () => {
  const dispatch = useDispatch();
  const { prople, loading, error } = useSelector(state => state.prople);

  useEffect(() => {
    dispatch(fetchProple());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prople List</h1>
      <ul className="space-y-2">
        {prople.map(person => (
          <li key={person.id} className="p-2 bg-gray-100 rounded-md">
            {person.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropleList;
