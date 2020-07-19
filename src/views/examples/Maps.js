/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Axios from "axios";

class Icons extends React.Component {
  state = {
    latitude: '',
    longitude: '',
    distance: '1000',
    studentData: [],
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const result = await Axios.get("http://localhost:3000/api/StudentService/getstudentnearme?latitude="
      + this.state.latitude + "&longitude=" + this.state.longitude + "&distance=" + this.state.distance);
    this.setState({studentData: result.data})
  }

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }
  renderStudentTable = () => {
    return this.state.studentData.map(student => {
      return (
        <tr>
          <td>{student.name}</td>
          <td>{student.class}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Find Students By Location</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Latitude
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleChange}
                              value={this.state.latitude}
                              id="input-first-name"
                              placeholder="Latitude"
                              type="text"
                              name="latitude"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Longitude
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleChange}
                              value={this.state.longitude}
                              id="input-last-name"
                              placeholder="Longitude"
                              type="text"
                              name="longitude"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Distance (in Meters)
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleChange}
                              value={this.state.distance}
                              id="input-first-name"
                              placeholder="Distance"
                              type="text"
                              name="distance"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <FormGroup>
                            <button type='submit' className='btn btn-success' onClick={this.handleSubmit}>Search</button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderStudentTable()}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Icons;
