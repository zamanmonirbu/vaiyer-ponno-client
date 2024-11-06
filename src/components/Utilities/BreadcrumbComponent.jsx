// BreadcrumbComponent.js
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BreadcrumbComponent = ({ items }) => {
  return (
    <div className="py-2 font-semi-bold px-12 bg-[#e6eeee]">
      <Breadcrumb>
        {items.map((item, index) => (
          <Breadcrumb.Item key={index}>
            {item.link ? (
              <Link to={item.link} className="text-black hover:text-gray-200 underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

// Define prop types for validation
BreadcrumbComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Text to display
      link: PropTypes.string, // Link path; if undefined, displays as plain text
    })
  ).isRequired,
};

export default BreadcrumbComponent;
