import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
} from "reactstrap";

import Header from "../components/Headers/Header";
import Axios from "axios";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      studentData: [1, 2, 3, 4, 5],
      search: {},
      searchClick: false
    };
  }

  componentDidMount = async () => {
    const result = await Axios.get('http://localhost:3000/api/StudentService/getstudent');
    console.log(result.data);
    this.setState({ studentData: result.data })
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  renderStudentTable = () => {
    return this.state.studentData.map(student => {
      return (
        <tr>
          <td>{student.name}</td>
          <td>{student.class}</td>
          <td><Button className="btn btn-success" onClick={() => {
            this.props.history.push('/admin/icons/' + student._id)
          }}>Update</Button></td>
        </tr>
      )
    })
  }
  handleClick = () => {
    this.setState({ searchClick: true })
  }

  handleSearch = async (e) => {
    this.setState({ search: e.currentTarget.value });
    const result =
      await Axios.get(
        'http://localhost:3000/api/StudentService/getstudentsearch?name=' + e.currentTarget.value
      );
    console.log(result.data);
    this.setState({ studentData: result.data });
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">All Students</h3>
                    </div>
                    <div className="col text-right">
                      <Form className="navbar-search navbar-search-light form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-search" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Search" onClick={this.handleClick} onChange={this.handleSearch} type="text" />
                          </InputGroup>
                        </FormGroup>
                      </Form>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Student Name</th>
                      <th scope="col">Class</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.studentData.length > 0 ? 
                    this.renderStudentTable() : 
                    (
                      <Row className="align-items-center">
                        <Col className="mb-5 mb-xl-0" xl="6"></Col>
                        <Col className="mb-5 mb-xl-0" xl="6">
                        <h3 className="mb-0">No Student Data In The System</h3>
                        </Col>
                      </Row>
                    )
                    }
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
