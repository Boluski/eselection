import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { useAuth } from "../AuthContext";

function BlackNavbar() {
  let authContext = useAuth();
  const [userState, setUserState] = useState(false);
  const [email, setEmail] = useState("");
  const [loadState, setLoadState] = useState(true);

  async function getCurrentUser() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setUserState(true);
        setLoadState(false);
      } else {
        setLoadState(false);
      }
    });
  }

  let noUserUI = (
    <>
      <NavDropdown.Item href="./login">Login</NavDropdown.Item>
      <NavDropdown.Item href="./signup">Sign up</NavDropdown.Item>
    </>
  );
  let UserUI = (
    <>
      <NavDropdown.Item href="#userAccount">{email}</NavDropdown.Item>
      <NavDropdown.Item href="./dashboard">Dashboard</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        href="#action/3.4"
        onClick={() => {
          authContext.signOut();
          setUserState(false);
        }}
      >
        Log out
      </NavDropdown.Item>
    </>
  );

  let nav = userState ? UserUI : noUserUI;

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Container className="customNavbar">
        <Navbar.Brand href="/" style={{ margin: "0" }}>
          e-selection
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#deets" style={{ paddingRight: "5%" }}>
              Deets
            </Nav.Link>
            <Nav.Link href="#pricing" style={{ paddingRight: "5%" }}>
              Pricing
            </Nav.Link>
            <Nav.Link href="#features" style={{ paddingRight: "5%" }}>
              Features
            </Nav.Link>
            <NavDropdown title="My account" id="collasible-nav-dropdown">
              {loadState ? <></> : nav}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BlackNavbar;