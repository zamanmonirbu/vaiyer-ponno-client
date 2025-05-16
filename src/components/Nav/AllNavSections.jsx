import HomeNotificationBar from "../../pages/HomeNotificationBar"
import MenuBar from "./MenuBar"
import Navbar from "./Navbar"

const AllNavSections = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <HomeNotificationBar />
      <Navbar />
      <MenuBar />
    </header>
  )
}

export default AllNavSections
