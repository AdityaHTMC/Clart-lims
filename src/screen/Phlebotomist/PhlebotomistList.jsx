/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    ArcElement,
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
  } from "chart.js";
  
  import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Spinner,
    Table,
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { FaEdit, FaTrashAlt } from "react-icons/fa";
  
  import CommonBreadcrumb from "../../component/common/bread-crumb";
  import { useCategoryContext } from "../../helper/CategoryProvider";
  // Register the necessary Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    BarElement,
    ArcElement,
    Filler,
    RadialLinearScale
  );
  
  const PhlebotomistList = () => {
    const navigate = useNavigate();
  
    const { getAllphlebotomist,phlebotomistList } = useCategoryContext();
  
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
        getAllphlebotomist();
    }, []);
  
    console.log(phlebotomistList, "phlebotomistList");
  
    const onOpenModal = () => {
      navigate("/add-phlebotomist");
    };
    const handleEdit = (id) => {
      // navigate(`/product-edit/${id}`);
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        // ProductDelete(id);
      }
    };
  
    const onCloseModal = () => {
      setOpen(false);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Phlebotomist List" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add Phlebotomist
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="promo-code-list">
                      <Table hover responsive>
                        <thead>
                          <tr>
                            <th>Name </th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            {/* <th>Pin Code</th> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Show loading spinner */}
                          {phlebotomistList?.loading ? (
                            <tr>
                              <td colSpan="7" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : phlebotomistList?.data?.length === 0 ? (
                            // Show "No products found" when there's no data
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Phlebotomist List Found
                              </td>
                            </tr>
                          ) : (
                            phlebotomistList?.data?.map((product, index) => (
                              <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.email}</td>
                                <td>{product.mobile}</td>
                                <td>{product.address}</td>
                                {/* <td>{product.pincode}</td> */}
  
                                <td>
                                  <div className="circelBtnBx">
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleEdit(product._id)}
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button
                                      className="btn"
                                      color="link"
                                      onClick={() => handleDelete(product._id)}
                                    >
                                      <FaTrashAlt />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default PhlebotomistList;
  