import { Link } from "react-router-dom";
import { Nav, Navbar, Container, Button } from "react-bootstrap";

// API
import { logoutAction } from "../../api";

// Redux
import { useDispatch } from "react-redux/es/exports";
import { logout } from "../../reducers";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (logoutAction()) dispatch(logout());
  };

  return (
    <Navbar bg="light" variant="light" className="navbar">
      <Container>
        <Nav className="nav__container">
          <Link to="/home">Home</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/servicios">Servicios</Link>
        </Nav>

        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </Container>
    </Navbar>
  );
};

export { NavBar };
