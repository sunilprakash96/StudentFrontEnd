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
  UncontrolledTooltip,
  Button
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Axios from "axios";

class Icons extends React.Component {
  state = {
    account: {
      name: '',
      class: '',
      latitude: '',
      longitude: ''
    }
  }

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const result = await Axios.get('http://localhost:3000/api/StudentService/getstudentbyid/' + id);

    const studentData = {
      name: result.data.name,
      class: result.data.class,
      latitude: result.data.loc.coordinates[0],
      longitude: result.data.loc.coordinates[1],
    }
    this.setState({ account: studentData })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const createStudentData = {
      name: this.state.account.name,
      class: this.state.account.class,
      latitude: this.state.account.latitude,
      longitude: this.state.account.longitude
    }
    const id = this.props.match.params.id;
    const result = await Axios.put('http://localhost:3000/api/StudentService/updatestudent/' + id, createStudentData)
    window.location = '/admin '
  }

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  }


  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Student</h3>
                    </Col>
                    {/* <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleChange}
                              value={this.state.account.name}
                              id="input-username"
                              name="name"
                              placeholder="Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Class
                            </label>
                            <Input
                              className="form-control-alternative"
                              onChange={this.handleChange}
                              value={this.state.account.class}
                              id="input-username"
                              placeholder="Class"
                              type="text"
                              name="class"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
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
                              value={this.state.account.latitude}
                              id="input-first-name"
                              placeholder="Latitude"
                              type="text"
                              name="latitude"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
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
                              value={this.state.account.longitude}
                              id="input-last-name"
                              placeholder="Longitude"
                              type="text"
                              name="longitude"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <button type='submit' className='btn btn-success' onClick={this.handleSubmit}>Update</button>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <button type='submit' className='btn btn-danger' onClick={() => { this.props.history.push('/admin/index') }}>Cancel</button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
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
