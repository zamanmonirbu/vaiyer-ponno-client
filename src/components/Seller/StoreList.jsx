// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createStore,fetchStore,updateStore,deleteStore } from '../../actions/sellerActions';


// const StoreList = () => {
//   const dispatch = useDispatch();
//   const { stores, loading, error } = useSelector((state) => state.seller);

//   useEffect(() => {
//     dispatch(fetchStore());
//   }, [dispatch]);

//   const handleCreateStore = () => {
//     const newStore = { name: 'New Store', description: 'Sample store description' };
//     dispatch(createStore(newStore));
//   };

//   return (
//     <div>
//       <h1>Stores</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <button onClick={handleCreateStore}>Create Store</button>
//       <ul>
//         {stores.map((store) => (
//           <li key={store._id}>{store.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StoreList;
