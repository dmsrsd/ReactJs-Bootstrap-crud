//import hook useState dan useEffect from react
import { useState, useEffect } from "react";
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
import { useHistory, useParams, Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import { URL_API } from "../../utils/api";

function EditPost() {
  const URL = URL_API;

  //state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //history
  const history = useHistory();

  //get ID from parameter URL
  const { id } = useParams();

  //hook useEffect
  useEffect(() => {
    getPostById();
  }, []);

  //function "getPostById"
  const getPostById = async () => {
    try {
      var formdata = new FormData();
      formdata.append("id", id);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${URL}get-data-by-id`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const parsedResult = JSON.parse(result);
          if (parsedResult.status == "200") {
            setTitle(parsedResult.data.title);
            setContent(parsedResult.data.content);
          } else {
            console.error("Gagal get data.");
          }
        })
        .catch((error) => console.log("error =>", error));
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  //function "updatePost"
  const updatePost = async (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("id", id);
    formdata.append("title", title);
    formdata.append("content", content);

    formdata.append("_method", "PUT");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${URL}update-data`, requestOptions)
      .then((response) => response.text())
      .then((result) => history.push("/posts"))
      .catch((error) => console.log("error =>", error));
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              <Form onSubmit={updatePost}>
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

                <Stack direction="horizontal" gap={3}>
                  <Button as={Link} to={`/posts`} variant="danger">
                    BACK
                  </Button>

                  <Button variant="primary" type="submit">
                    UPDATE
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

export default EditPost;
