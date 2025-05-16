// BreadcrumbComponent.js
import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const BreadcrumbComponent = ({ items }) => {
  return (
    <div className="py-2 px-3 sm:px-6 md:px-12 bg-[#e6eeee] overflow-x-auto whitespace-nowrap">
      <Breadcrumb className="text-sm sm:text-base">
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.link ? (
              <Link to={item.link} className="text-black hover:text-gray-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  )
}

// Define prop types for validation
BreadcrumbComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired, // Text or node to display
      link: PropTypes.string, // Link path; if undefined, displays as plain text
    }),
  ).isRequired,
}

export default BreadcrumbComponent
