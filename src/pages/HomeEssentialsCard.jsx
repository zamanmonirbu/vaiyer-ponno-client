
const HomeEssentialsCard = ({ category }) => {
    console.log(category)
  return (
    <div className="p-2 max-w-lg mx-auto">
      <div className="text-center group cursor-pointer">
        <div className="w-32 h-32 bg-content bg-center overflow-hidden rounded-md">
          <img
            src={category.imageURL}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <p className="mt-2 text-sm font-semibold">{category.name.slice(0,10)}</p>
      </div>
      {/* <Link to={category.link} className="text-blue-600 mt-4 inline-block hover:underline">
        Discover more
      </Link> */}
    </div>
  );
};

export default HomeEssentialsCard;
