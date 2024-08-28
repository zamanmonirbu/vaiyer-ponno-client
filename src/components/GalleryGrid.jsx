import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGalleryItems } from '../actions/galleryActions';
import { Link } from 'react-router-dom';

const GalleryGrid = () => {
    const dispatch = useDispatch();
    const galleryItems = useSelector((state) => state.galleryItems.galleryItems);

    useEffect(() => {
        dispatch(fetchGalleryItems());
    }, [dispatch]);

    console.log(galleryItems)

    return (
        <div className="grid grid-cols-4 gap-4 py-4">
            {galleryItems.map((item) => {
                const gridClasses = item.isLarge
                    ? 'col-span-2 row-span-2'
                    : item.isMedium
                    ? 'col-span-2'
                    : 'col-span-1';

                return (
                    <Link 
                        key={item._id}
                        to={item.link}
                        className={`${item.color} ${gridClasses} rounded-lg overflow-hidden flex flex-col justify-end p-4 text-white`}
                        style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div>
                            <h2 className={`${item.color} text-xl font-semibold`}>{item.text}</h2>
                            <p className={`${item.color}`}>{item.subText}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default GalleryGrid;




// const GalleryGrid = () => {
//     const items = [
//         { id: 1, link: '#', image: 'image1.png', text: 'Get the top picks', subText: 'Shop Bestsellers', bgColor: 'bg-cyan-200' },
//         { id: 2, link: '#', image: 'image2.png', text: 'Clean with a higher standard', subText: 'Shop Now', bgColor: 'bg-blue-900' },
//         { id: 3, link: '#', image: 'image3.png', text: 'Meet Grove Co.', subText: 'Shop Now', bgColor: 'bg-orange-400', isMedium: true },
//         { id: 4, link: '#', text: '15,026,734 million lbs of plastic saved', subText: 'Our Community Impact', bgColor: 'bg-blue-500', isLarge: true },
//         { id: 5, link: '#', image: 'image4.png', text: 'Deals for you', subText: 'Save Sustainably', bgColor: 'bg-yellow-400' },
//         { id: 6, link: '#', image: 'image5.png', text: 'Fresh self-care', subText: 'Shop Favorites', bgColor: 'bg-pink-200' },
//         { id: 7, link: '#', image: 'image6.png', text: 'Ooh. Mrs. Meyer\'s', subText: 'Shop Now', bgColor: 'bg-yellow-100',isMedium: true },
//         { id: 8, link: '#', image: 'image7.png', text: 'Go Beyond Plastic™', subText: 'Shop Plastic-Free', bgColor: 'bg-green-400' },
//         { id: 9, link: '#', image: 'image8.png', text: 'Sustainable starter sets', subText: 'Shop Now', bgColor: 'bg-teal-400' },
//         { id: 10, link: '#', image: 'image9.png', text: '20% off in your first order', subText: 'Shop Subscriptions', bgColor: 'bg-yellow-300' }
//     ];

//     return (
//         <div className="grid grid-cols-4 gap-4 py-4">
//             {items.map((item) => {
//                 const gridClasses = item.isLarge
//                     ? 'col-span-2 row-span-2'
//                     : item.isMedium
//                     ? 'col-span-2'
//                     : 'col-span-1';

//                 return (
//                     <a 
//                         key={item.id}
//                         href={item.link}
//                         className={`${item.bgColor} ${gridClasses} rounded-lg overflow-hidden flex flex-col justify-end p-4 text-white`}
//                         style={{
//                             backgroundImage: `url(${item.image})`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center'
//                         }}
//                     >
//                         <div>
//                             <h2 className="text-xl font-semibold">{item.text}</h2>
//                             <p>{item.subText}</p>
//                         </div>
//                     </a>
//                 );
//             })}
//         </div>
//     );
// };

// export default GalleryGrid;




















