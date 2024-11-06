import PropTypes from 'prop-types';
import ViewDown from '../../pages/ViewDown';
import AllNavSections from '../Nav/AllNavSections';

const MainLayout = ({ children }) => (
  <>
    <AllNavSections />
    <main>{children}</main>
    <ViewDown />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default MainLayout;
