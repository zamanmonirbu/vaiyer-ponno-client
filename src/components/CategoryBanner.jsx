import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../actions/categoryActions';
import { getBanners } from '../actions/bannerActions';
import { Link } from 'react-router-dom';
import StrikeLine from './StrikeLine';

const CategoryBanner = () => {
    const dispatch = useDispatch();
    const banners = useSelector((state) => state.banner.banners);
    const categories = useSelector((state) => state.categories.categories);
    const loading = useSelector((state) => state.categories.loading);
    const error = useSelector((state) => state.categories.error);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getBanners());
    }, [dispatch]);

    useEffect(() => {
        if (banners.length > 0) {
            const interval = setInterval(() => {
                setFade(false);
                setTimeout(() => {
                    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banners.length);
                    setFade(true);
                }, 1000);
            }, 3000); 

            return () => clearInterval(interval);
        }
    }, [banners.length]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full">
           <StrikeLine/>
            <div className="flex h-96">
                {/* Categories Section */}
                <div className="w-2/5 bg-[#033B4C] text-white rounded-lg px-2 py-2">
                    <fieldset>
                        <legend className="text-xl font-bold mb-2 text-center">Categories</legend>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category._id} className="flex items-center">
                                    <Link
                                        to={`/category/${category.category}`}
                                        className="text-lg cursor-pointer hover:bg-gray-200 p-1 bg-white w-[100%] rounded text-[#033B4C]"
                                    >
                                        {category.category}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>

                {/* Banner Section */}
                <div className="w-full ml-2 relative">
                    {banners.length > 0 && (
                        <img
                            src={banners[currentImageIndex]?.imageUrl}
                            alt="Banner"
                            className={`h-full w-full object-cover rounded-lg transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}
                        />
                    )}
                </div>

                {/* Placeholder Image Section */}
                <div className="w-1/5">
                    <Link to="#">
                        <img
                            src="https://st2.depositphotos.com/52908438/47899/v/450/depositphotos_478996126-stock-illustration-download-page-mobile-app-mock.jpg"
                            alt="Placeholder"
                            className="rounded-xl ml-2 h-64"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoryBanner;
