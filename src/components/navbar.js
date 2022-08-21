import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import "../App.css"
import Logo from "../images/logo.jfif"
const NavbarApp=()=> {

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container >
      <Navbar.Brand href="#" className='logo-text' style={{fontSize:35}}><img
              alt=""
              src={Logo}
              width="70"
              height="60"
              className="d-inline-block align-top logo"
            />{" "}RASEED</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link><Link to="/"  className='link-anchors'>Dashboard</Link></Nav.Link>
            <Nav.Link><Link to="/entries"  className='link-anchors'>Add Entries</Link></Nav.Link>
            <Nav.Link><Link to="/gj"  className='link-anchors'>General Journal</Link></Nav.Link>
            <Nav.Link><Link to="/ledger"  className='link-anchors'>Ledger</Link></Nav.Link>

{/* onClick={()=> setActiveNav('#')} className={ activeNav === '#' ? 'active' : ''} active */}

            <NavDropdown title="Reports" className='link-anchors' id="navbarScrollingDropdown">

              <NavDropdown.Item href="#action3"><Link to="/balSheet" className='report-links'>Balance Sheet</Link></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4"><Link to="/trail" className='report-links'>Trail Balance Sheet</Link></NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action5">Cash Flow Statment</NavDropdown.Item> */}
            </NavDropdown>
            {/*<Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;