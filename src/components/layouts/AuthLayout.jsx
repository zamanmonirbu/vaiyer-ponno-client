import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => (
  <main>{children}</main>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default AuthLayout;
