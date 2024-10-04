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
import CommonBreadcrumb from "../component/common/bread-crumb";
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
import { useCategoryContext } from "../helper/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
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

const UnitList = () => {
  const navigate = useNavigate();

  const { getunitList, unitLists, ProductDelete } = useCategoryContext();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getunitList();
  }, []);

  console.log(unitLists,'unitLists');

  const onOpenModal = () => {
    navigate("/add-products");
  };
  const handleEdit = (id) => {
    // navigate(`/product-edit/${id}`); 
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      ProductDelete(id);
    }
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <CommonBreadcrumb title="Unit List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Unit
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table  hover responsive >
                      <thead >
                        <tr>
                          <th>Unit Name </th>
                          <th>Contact Person Name</th>
                          <th>Mobile</th>
                          <th>District</th>
                          <th>Pin Code</th>
                       
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {unitLists?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : unitLists?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Unit List Found
                            </td>
                          </tr>
                        ) : (
                          unitLists?.data?.map((product, index) => (
                            <tr key={index} >
                              <td>{product.organization_name}</td>
                              <td>{product.contact_person}</td>
                              <td>{product.mobile}</td>
                              <td>{product.district}</td>
                              <td>{product.pincode}</td>
                          
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

export default UnitList;