/* eslint-disable react/no-unknown-property */
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
  Badge,
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
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
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

import { Collapse, CardHeader } from "reactstrap";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

// Sample FAQ Data
const faqData1 = [
  {
    qus: "How can I downgrade to an earlier version of Dummy Content?",
    ans: "It looks like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
  },
  {
    qus: "How can I upgrade from Shopify 2.5 to Shopify 3?",
    ans: "Lorem Ipsum as their default model text. Various versions have evolved over the years.",
  },
  {
    qus: "Under what license are Regular Labs extensions released?",
    ans: "Many desktop publishing packages and web page editors now use Lorem Ipsum.",
  },
  {
    qus: "What is the Regular Labs Library?",
    ans: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    qus: "Can I turn on/off some blocks on the page?",
    ans: "It has survived not only five centuries, but also the leap into electronic typesetting.",
  },
  {
    qus: "What is included in the theme package?",
    ans: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker.",
  },
];

const FaqList = () => {
  const navigate = useNavigate();

  const { getFaqList, FaqList,addFaq } = useCategoryContext();

  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    question: "",
    answer: "",
    status: "",
    _id: "",
  });

  useEffect(() => {
    getFaqList();
  }, []);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onOpenModal2 = (product) => {
    setSelectedvarity(product);
    setModalOpen(true);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({ title: "", image: "", _id: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";

    console.log(product._id, newStatus, "mew status: ");
    // await switchVarity(product._id, newStatus); // Your API call here
  };

  // Handle form input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedvarity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit for updating the brand
  const handleSubmits = () => {
    // editvarity(selectedvarity._id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      //   varityDelete(id);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Send formData to the backend
    addFaq(formData);
    onCloseModal(); 
  };

  return (
    <>
      <CommonBreadcrumb title="FAQ List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Question
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  {/* <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {varityList?.data?.map((product, index) => (
                          <>
                            <tr>
                              <td>{product.title}</td>
  
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`flexSwitchCheckChecked-${index}`} // unique ID for each row
                                    checked={product.status === "Active"} // Reflects current status
                                    onChange={() => handleStatusToggle(product)} // Toggle status on change
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`flexSwitchCheckChecked-${index}`}
                                  >
                                    {product.status === "Active"
                                      ? "Active"
                                      : "Inactive"}
                                  </label>
                                </div>
                              </td>
  
                              <td>
                                <FaEdit
                                  size={20}
                                  onClick={() => onOpenModal2(product)}
                                  style={{
                                    marginRight: "10px",
                                    cursor: "pointer",
                                  }} // Adds space and pointer cursor
                                />
                                <AiOutlineDelete
                                  size={20}
                                  onClick={() => handleDelete(product._id)}
                                  style={{ cursor: "pointer" }} // Adds pointer cursor
                                />
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </Table> */}
                  {FaqList?.loading && (
                    <div className="d-flex justify-content-center align-items-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">
                          <Spinner color="secondary" className="my-4" />
                        </span>
                      </div>
                    </div>
                  )}
                  {Array.isArray(FaqList?.data) &&
                    FaqList?.data?.map((faq, index) => (
                      <Card
                        key={index}
                        className="mb-3 shadow-lg border-0 faq-card"
                        style={{
                          borderRadius: "12px",
                          transition: "box-shadow 0.3s ease",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <CardHeader
                          style={{
                            background:
                              activeIndex === index ? "#f1f3f5" : "#f8f9fa",
                            cursor: "pointer",
                            padding: "1.25rem",
                            fontWeight: "bold",
                            borderBottom:
                              activeIndex === index
                                ? "2px solid #007bff"
                                : "none",
                            transition: "background-color 0.3s ease",
                          }}
                          className="d-flex justify-content-between align-items-center"
                        >
                          {/* Arrow Icon at the Beginning */}
                          <Button
                            color="link"
                            className="p-0 text-dark faq-toggle-btn"
                            aria-expanded={activeIndex === index}
                            onClick={() => toggle(index)}
                            style={{ marginRight: "10px" }}
                          >
                            {activeIndex === index ? (
                              <FaChevronDown size={20} />
                            ) : (
                              <FaChevronRight size={20} />
                            )}
                          </Button>

                          <span
                            style={{
                              flex: 1,
                              textAlign: "left",
                              marginLeft: "10px",
                              fontSize: "15px",
                            }}
                          >
                            {faq.question}
                          </span>

                          <div className="d-flex align-items-center">
                            {/* Edit and Delete icons */}
                            <FaEdit
                              size={20}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent collapse
                                onOpenModal2(faq);
                              }}
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            />
                            <AiOutlineDelete
                              size={20}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent collapse
                                handleDelete(faq._id);
                              }}
                              style={{
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                            />

                            {/* Toggle Button was moved to the beginning */}
                          </div>
                        </CardHeader>

                        <Collapse isOpen={activeIndex === index}>
                          <div
                            className="card-body"
                            style={{ padding: "1.25rem" }}
                          >
                            <p className="text-muted">{faq.answer}</p>
                          </div>
                        </Collapse>
                      </Card>
                    ))}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <style jsx>{`
          .faq-card:hover {
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          }

          .faq-toggle-btn {
            font-size: 1.5rem;
          }
        `}</style>
      </Container>

      <Modal
        isOpen={open}
        toggle={onCloseModal}
        className="modal-lg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add FAQ
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <FormGroup>
              <Label htmlFor="question" className="col-form-label">
                Add Question :
              </Label>
              <Input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                id="question"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="answer" className="col-form-label">
                Add Answer:
              </Label>
              <Input
                type="textarea"
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                id="answer"
                style={{ minHeight: "80px" }} 
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalOpen} toggle={onCloseModal2}>
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Varity Master
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="question" className="col-form-label">
                Title:
              </Label>
              <Input
                type="text"
                name="question"
                value={selectedvarity.question}
                onChange={handleInputChanges}
                id="question"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="answer" className="col-form-label">
                Description:
              </Label>
              <Input
                type="textarea"
                name="answer"
                value={selectedvarity.answer}
                onChange={handleInputChanges}
                id="answer"
                style={{ minHeight: "80px" }} 
              />
            </FormGroup>

            <FormGroup>
              <Label className="col-form-label">Status:</Label>
              <div className="d-flex justify-content-start mt-2">
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={selectedvarity.status === "Active"} // Check if the value matches 'Active'
                      onChange={handleInputChanges}
                    />
                    Active
                  </Label>
                </FormGroup>
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={selectedvarity.status === "Inactive"}
                      onChange={handleInputChanges}
                    />
                    Inactive
                  </Label>
                </FormGroup>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmits}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal2}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FaqList;
