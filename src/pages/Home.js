//import component Bootstrap React
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body className="p-4">
              <h2>Welcome Home !</h2>
              <p class="lead">
                Pada halaman <strong>CRUD Example</strong> berisi contoh simple Web
                Application dan menerapkan{" "}
                <strong>CRUD (Create, Read, Update and Delete)</strong> dengan
                menggunakan <strong>PHP sebagai back-end dan ReactJs untuk front-end.</strong>
              </p>

              <Button as={Link} to={`/posts`} variant="warning" size="lg">
                Ke Aplikasi
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
