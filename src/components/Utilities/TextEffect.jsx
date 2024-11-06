import { AiOutlineUp } from 'react-icons/ai';

const TextEffect = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="bg-gray-700 p-2 cursor-pointer mt-[15%]" onClick={scrollToTop} >
      <div className="text-center text-white flex items-center justify-center space-x-2">
        <span>Back to Top</span>
        <AiOutlineUp size={15} />
      </div>
    </div>
  );
};

export default TextEffect;
