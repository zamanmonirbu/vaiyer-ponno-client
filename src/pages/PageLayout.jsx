import GalleryGrid from "./GalleryGrid"
import AllProductViews from "./AllProductViews"

const PageLayout = () => {
  return (
    <div className="px-2 sm:px-4 lg:px-[3%] bg-white w-full max-w-[2000px] mx-auto">
      <GalleryGrid />
      <AllProductViews />
    </div>
  )
}

export default PageLayout
