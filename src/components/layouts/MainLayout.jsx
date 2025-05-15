import PropTypes from "prop-types"
import ViewDown from "../../pages/ViewDown"
import AllNavSections from "../Nav/AllNavSections"

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <AllNavSections />
    <main className="flex-grow w-full max-w-[2000px] mx-auto px-2 sm:px-4 md:px-6">{children}</main>
    <ViewDown />
  </div>
)

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
