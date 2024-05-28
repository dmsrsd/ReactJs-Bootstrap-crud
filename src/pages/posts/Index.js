import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Table,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import { URL_API } from "../../utils/api";

function PostIndex() {
  const URL = URL_API;

  // Define state
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  // Function "fetchData"
  const fetchData = async () => {
    const response = await axios.get(`${URL}get-data`);
    const data = response.data.data; // Updated to remove redundant await
    setPosts(data);
  };

  // Function "deletePost"
  const deletePost = async (id) => {
    try {
      var formdata = new FormData();
      formdata.append("id", id);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${URL}delete-data`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const parsedResult = JSON.parse(result);
          if (parsedResult.status === "200") {
            console.log("Post berhasil dihapus.");
            fetchData();
          } else {
            console.error("Gagal menghapus post.");
          }
        })
        .catch((error) => console.log("error =>", error));
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Button
                as={Link}
                to="/posts/create"
                variant="success"
                className="mb-3"
              >
                + TAMBAH DATA
              </Button>
              <Table striped bordered hover className="mb-1">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>TITLE</th>
                    <th>CONTENT</th>
                    <th className="text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.map((post, index) => (
                    <tr key={post.id}>
                      <td>{indexOfFirstPost + index + 1}</td>{" "}
                      {/* Corrected to display the correct number */}
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                      <td className="text-center">
                        <Button
                          as={Link}
                          to={`/posts/edit/${post.id}`}
                          variant="primary"
                          size="sm"
                          className="me-2"
                        >
                          EDIT
                        </Button>
                        <Button
                          onClick={() => deletePost(post.id)}
                          variant="danger"
                          size="sm"
                        >
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center mt-3">
                <Pagination>
                  {pageNumbers.map((number) => (
                    <Pagination.Item
                      key={number}
                      onClick={() => paginate(number)}
                      active={number === currentPage}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PostIndex;
