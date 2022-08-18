import PropTypes from "prop-types";

// Components
import { NavBar } from "../../components/Nav";

const LayoutPage = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <div className="layout__content">{children}</div>
    </div>
  );
};

LayoutPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutPage };
