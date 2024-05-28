//import component Bootstrap React
import { Navbar, Container, Nav } from "react-bootstrap";

//import react router dom
import { Switch, Route, Link } from "react-router-dom";

//import component Home
import Home from "./pages/Home";

//import component Post Index
import PostIndex from "./pages/posts/Index";

//import component Post Create
import PostCreate from "./pages/posts/Create";

//import component Post Edit
import PostEdit from "./pages/posts/Edit";

function App() {
  return (
    <div>
      {/* NAVIGATOR */}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/"></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-link">
                HOME
              </Nav.Link>
              <Nav.Link as={Link} to="/posts" className="nav-link">
                CRUD EXAMPLE
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* TABLE DATA  */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={PostIndex} />
        <Route exact path="/posts/create" component={PostCreate} />
        <Route exact path="/posts/edit/:id" component={PostEdit} />
      </Switch>
    </div>
  );
}

export default App;
