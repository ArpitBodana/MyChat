import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/user/userSlice";
import Logout from "../assets/logout.png";
import Settings from "../assets/settings.png";
import Profile from "../assets/profile.png";
import friendReq from "../assets/friendReq.png";
import { Badge } from "react-bootstrap";

function AppBar() {
  const { info } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, _id } = info;
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };
  const [searchUser, setSearchUser] = useState("");
  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search/${searchUser}`);
    window.location.reload();
  };
  return (
    <>
      <Navbar bg="light" expand="md" className="">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src="/favicon-32x32.png" alt="app" /> MyChat
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                MyChat
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <NavDropdown
                  title={`${name}`}
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <LinkContainer to="/requests">
                    <NavDropdown.Item className="">
                      Requests <img width={"20px"} src={friendReq} />{" "}
                      <Badge className="bg-danger">
                        {info.requests &&
                          info.requests?.length > 0 &&
                          info.requests?.length}
                      </Badge>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`/profile/${_id}`}>
                    <NavDropdown.Item className="">
                      Profile <img width={"20px"} src={Profile} />
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <NavDropdown.Item>
                      Settings <img width={"20px"} src={Settings} />
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout <img width={"20px"} src={Logout} />
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex" onSubmit={searchHandler}>
                <Form.Control
                  type="search"
                  placeholder="Search User..."
                  className="me-2"
                  aria-label="Search"
                  required
                  onChange={(e) => setSearchUser(e.target.value)}
                />
                <Button variant="outline-danger" type="submit">
                  Search
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default AppBar;
