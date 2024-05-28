//import hook useState from react
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory, useParams, Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
//import component Bootstrap React
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { URL_API } from "../../utils/api";

function CreatePost() {
  const URL = URL_API;

  //state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //history
  const history = useHistory();

  //SWAL
  const MySwal = withReactContent(Swal);

  //method "storePost"
  const storePost = async (e) => {
    e.preventDefault();

    console.log("title", title);
    console.log("content", content);

    if (title !== "" && content !== "") {
      var formdata = new FormData();
      formdata.append("title", title);
      formdata.append("content", content);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${URL}post-data`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log("Result:", result);
          history.push("/posts");
        })
        .catch((error) => console.log("error =>", error));
    } else {
      MySwal.fire({
        title: <p>Data Tidak Boleh Kosong !</p>,
      });
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Form onSubmit={storePost}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>CONTENT</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Masukkan Content"
                  />
                </Form.Group>

                {/* <Button variant="primary" type="submit">
                  SIMPAN
                </Button> */}

                <Stack direction="horizontal" gap={3}>
                  <Button as={Link} to={`/posts`} variant="danger">
                    BACK
                  </Button>

                  <Button variant="primary" type="submit">
                    SIMPAN
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
