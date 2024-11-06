import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './FilterCom.css';
import PropTypes from 'prop-types';


const FilterComponent = ({
  setSelectedRating,
  setSelectedGenders,
  setSelectedPriceRange,
  setCustomPriceRange,
  setSortBy,
  selectedRating,
  selectedGenders,
  selectedPriceRange,
  customPriceRange,
  sortBy,
}) => {

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleGenderChange = (gender) => {
    if (selectedGenders.includes(gender)) {
      setSelectedGenders(selectedGenders.filter((g) => g !== gender));
    } else {
      setSelectedGenders([...selectedGenders, gender]);
    }
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
  };

  const handleCustomPriceChange = (e) => {
    const { name, value } = e.target;
    setCustomPriceRange({ ...customPriceRange, [name]: value });
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        if (index < rating) {
          return <FaStar key={index} className="text-yellow-500" />;
        } else {
          return <FaRegStar key={index} className="text-yellow-500" />;
        }
      });
  };

  const getBorderStyle = (option) => {
    return option === selectedRating || option === selectedPriceRange
      ? 'border-2 border-[#033B4C]'
      : '';
  };

  return (
    <div className="w-64 p-4 rounded-lg">
      
      {/* Sort By Dropdown */}
      <div className="mb-6">
        <label htmlFor="sortBy" className="text-lg font-semibold mb-4 block text-[#033B4C]">
          Sort By
        </label>
        <select
          id="sortBy"
          className="w-full p-2 border border-gray-300 rounded-lg text-[#033B4C]"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="" disabled>Select</option>
          <option value="mostRated">Most Rated</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="new">New</option>
          <option value="bestSelling">Best Selling</option>
        </select>
      </div>

      {/* Customer Rating */}
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-4 cursor-pointer flex justify-between items-center text-[#033B4C]"
          onClick={() => setSelectedRating(selectedRating ? '' : 'open')}
        >
          Customer Rating
          {selectedRating ? <AiOutlineUp className="text-sm font-black" /> : <AiOutlineDown className="text-sm font-black" />}
        </h3>
        {selectedRating && (
          <div className="pl-4">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div className={`flex items-center mb-2 p-2 rounded-lg ${getBorderStyle(`${stars}-star`)}`} key={stars}>
                <input
                  type="radio"
                  id={`${stars}-star`}
                  name="rating"
                  onChange={() => handleRatingChange(`${stars}-star`)}
                  checked={selectedRating === `${stars}-star`}
                  className="custom-radio mr-2"
                />
                <label htmlFor={`${stars}-star`} className="flex items-center text-[#033B4C]">
                  {renderStars(stars)}
                  & Up
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gender */}
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-4 cursor-pointer flex justify-between items-center text-[#033B4C]"
          onClick={() => setSelectedGenders(selectedGenders.length > 0 ? [] : 'open')}
        >
          Gender
          {selectedGenders.length > 0 ? <AiOutlineUp className="text-sm font-black" /> : <AiOutlineDown className="text-sm font-black" />}
        </h3>
        {selectedGenders.length > 0 && (
          <div className="pl-4">
            <div className={`flex items-center mb-2 p-2 rounded-lg ${getBorderStyle('Male')}`}>
              <input
                type="checkbox"
                id="male"
                onChange={() => handleGenderChange('Male')}
                checked={selectedGenders.includes('Male')}
                className="custom-checkbox mr-2"
              />
              <label htmlFor="male" className="text-[#033B4C]">Male</label>
            </div>
            <div className={`flex items-center mb-2 p-2 rounded-lg ${getBorderStyle('Female')}`}>
              <input
                type="checkbox"
                id="female"
                onChange={() => handleGenderChange('Female')}
                checked={selectedGenders.includes('Female')}
                className="custom-checkbox mr-2"
              />
              <label htmlFor="female" className="text-[#033B4C]">Female</label>
            </div>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3
          className="text-lg font-semibold mb-4 cursor-pointer flex justify-between items-center text-[#033B4C]"
          onClick={() => setSelectedPriceRange(selectedPriceRange ? '' : 'open')}
        >
          Price Range
          {selectedPriceRange ? <AiOutlineUp className="text-sm font-black" /> : <AiOutlineDown className="text-sm font-black" />}
        </h3>
        {selectedPriceRange && (
          <div className="pl-4">
            <div className={`flex items-center mb-2 p-2 rounded-lg ${getBorderStyle('$0 - $50')}`}>
              <input
                type="radio"
                id="range1"
                name="priceRange"
                onChange={() => handlePriceRangeChange('$0 - $50')}
                checked={selectedPriceRange === '$0 - $50'}
                className="custom-radio mr-2"
              />
              <label htmlFor="range1" className="text-[#033B4C]">$0 - $50</label>
            </div>
            <div className={`flex items-center mb-2 p-2 rounded-lg ${getBorderStyle('$50 - $100')}`}>
              <input
                type="radio"
                id="range2"
                name="priceRange"
                onChange={() => handlePriceRangeChange('$50 - $100')}
                checked={selectedPriceRange === '$50 - $100'}
                className="custom-radio mr-2"
              />
              <label htmlFor="range2" className="text-[#033B4C]">$50 - $100</label>
            </div>
            <div className={`flex items-center mb-2 p-2 rounded-lg ${getBorderStyle('$100 - $200')}`}>
              <input
                type="radio"
                id="range3"
                name="priceRange"
                onChange={() => handlePriceRangeChange('$100 - $200')}
                checked={selectedPriceRange === '$100 - $200'}
                className="custom-radio mr-2"
              />
              <label htmlFor="range3" className="text-[#033B4C]">$100 - $200</label>
            </div>
            <div className={`flex items-center mb-2 p-2 rounded-lg ${getBorderStyle('$200+')}`}>
              <input
                type="radio"
                id="range4"
                name="priceRange"
                onChange={() => handlePriceRangeChange('$200+')}
                checked={selectedPriceRange === '$200+'}
                className="custom-radio mr-2"
              />
              <label htmlFor="range4" className="text-[#033B4C]">$200+</label>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="minPrice" className="text-[#033B4C]">Custom Range</label>
              <div className="flex items-center mt-2">
                <input
                  type="number"
                  id="minPrice"
                  name="min"
                  placeholder="Min"
                  value={customPriceRange.min}
                  onChange={handleCustomPriceChange}
                  className="mr-2 w-full p-2 border rounded-lg text-[#033B4C] border-[#033B4C] focus:ring-[#033B4C]"
                />
                <span className="mx-2 text-[#033B4C]">-</span>
                <input
                  type="number"
                  id="maxPrice"
                  name="max"
                  placeholder="Max"
                  value={customPriceRange.max}
                  onChange={handleCustomPriceChange}
                  className="w-full p-2 border rounded-lg text-[#033B4C] border-[#033B4C] focus:ring-[#033B4C]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add PropTypes for each prop
FilterComponent.propTypes = {
  setSelectedRating: PropTypes.func.isRequired,
  setSelectedGenders: PropTypes.func.isRequired,
  setSelectedPriceRange: PropTypes.func.isRequired,
  setCustomPriceRange: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  selectedRating: PropTypes.string,
  selectedGenders: PropTypes.arrayOf(PropTypes.string),
  selectedPriceRange: PropTypes.string,
  customPriceRange: PropTypes.shape({
    min: PropTypes.string,
    max: PropTypes.string
  }),
  sortBy: PropTypes.string,
};



export default FilterComponent;
