/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";


import { toast } from "react-toastify";
import { FaCircleXmark } from "react-icons/fa6";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useOrderContext } from "../helper/OrderProvider";

const CreateOrder = () => {
  const {
    allTest,
    getAllTest,
    getCustomerDetail,
    allCustomer,
    test_package,
    getTestPackageList,
    getProfessionalFees,
    professionalFees,
    createNewOrder,
  } = useOrderContext();
  const Navigate = useNavigate();


  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedTest, setSelectedTest] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [formData, setFormData] = useState({
    pet: "",
    type: "test",
    test_package: "",
    images: [],
    payment_mode: "Cash",
  });

  const [totalAmount, setTotalAmount] = useState(0);

  console.log(selectedCustomer,'selectedCustomer')

  useEffect(() => {
    getAllTest();
    getProfessionalFees();
  }, []);

  useEffect(() => {
    if (test_package.loading && formData.type === "health_package") {
      getTestPackageList();
    }
  }, [test_package.loading, formData]);

  useEffect(() => {
    if (search && search.length > 2) {
      const timeout = setTimeout(() => {
        getCustomerDetail({ keyword_search: search });
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [search]);

  useEffect(() => {
    let amount = 0;

    selectedTest.forEach((el) => {
      amount += el.sell_price;
    });

    if (formData.test_package) {
      const packageDetail = test_package?.data?.find(
        (el) => el._id?.toString() === formData.test_package
      );
      if (packageDetail) {
        amount = amount + packageDetail?.sell_price || 0;
      }
    }

    selectedFees.forEach((el) => {
      amount += el.expected_charges;
    });
    setTotalAmount(amount);
  }, [selectedTest, formData.test_package, selectedFees]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      pet: "",
      type: "test",
      test_package: "",
      images: [],
      payment_mode: "Cash",
    });
    setSelectedCustomer(null);
    setSelectedTest([]);
    setSelectedFees([]);
    setTotalAmount(0);
  };

  const onTestSelect = (data) => {
    setSelectedTest(data);
    if (formData.test_package) {
      setFormData({ ...formData, test_package: "" });
    }
  };

  const onPackageSelect = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (selectedTest && selectedTest.length > 0) {
      setSelectedTest([]);
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...selectedFiles], // Append new images
    }));
  };

  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Remove image at index
    }));
  };

  const onFeesSelect = (data) => {
    setSelectedFees(data);
  };

  const createOrder = async () => {
    let bodyData = new FormData();

    bodyData.append("userId", selectedCustomer._id);
    bodyData.append("state", selectedCustomer.state);
    bodyData.append("district", selectedCustomer.district);
    bodyData.append("address", selectedCustomer.address);
    bodyData.append("pincode", selectedCustomer.pincode);
    bodyData.append("pet_id", formData.pet);
    selectedTest.forEach((el, i) => {
      bodyData.append(`tests[${i}][test]`, el._id);
      bodyData.append(`tests[${i}][price]`, el.sell_price);
    });
    selectedFees?.forEach((el, i) => {
      bodyData.append(`professional_fees[${i}][professional_fee]`, el._id);
      bodyData.append(`professional_fees[${i}][price]`, el.expected_charges);
    });
    if (formData.test_package && formData.type === "health_package") {
      const packageDetail = test_package?.data?.find(
        (el) => el._id?.toString() === formData.test_package
      );
      if (packageDetail) {
        bodyData.append("test_package[package_id]", packageDetail._id);
        bodyData.append("test_package[price]", packageDetail.sell_price);
      }
    }
    if (formData.images.length > 0) {
      for (let i = 0; i < formData.images.length; i++) {
        bodyData.append(`prescription`, formData.images[i]);
      }
    }

    bodyData.append("payment_mode", formData.payment_mode);
    bodyData.append("total_amount", totalAmount);
    setIsProcessing(true);
    const res = await createNewOrder(bodyData);
    setIsProcessing(false);
    if (res.status === 200) {
      toast.success(res?.message);
      console.log(res);
      Navigate("/all-orders");
    } else {
      toast.error(res?.message || "An error occured while creating an order");
    }
  };

  return (
    <>
      <CommonBreadcrumb title={"Create Order"} parent="" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <div className="">
                      {selectedCustomer && selectedCustomer._id ? (
                        <>
                          <Label style={{ fontWeight: 600 }}>
                            Selected Customer
                          </Label>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                                src={
                                  selectedCustomer?.image ||
                                  `/assets/images/profile.png`
                                }
                                alt="header-user"
                              />
                              <div>
                                <h5 className="mb-0">
                                  {selectedCustomer.first_name ||
                                    selectedCustomer.name}
                                </h5>
                                <p>{selectedCustomer.mobile}</p>
                              </div>
                            </div>
                            <div>
                              <Badge
                                color="primary"
                                style={{ cursor: "pointer" }}
                                onClick={resetForm}
                              >
                                <FaCircleXmark style={{ fontSize: 18 }} />
                              </Badge>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="position-relative">
                          <form className="searchBx">
                            <Label style={{ fontWeight: 600 }}>
                              Select Customer
                            </Label>
                            <Input
                              onChange={(e) => setSearch(e.target.value)}
                              value={search}
                              type="text"
                              name="search1"
                              placeholder="Search customer ..."
                            />
                            {/* <button>Search</button> */}
                          </form>
                          {search.length > 2 && (
                            <div className="dropdown p-absolute bottom-0 w-100 z-2">
                              <ul
                                className="dropdown-menu show"
                                style={{
                                  maxHeight: "300px",
                                  overflowY: "auto",
                                  width: "100%",
                                }}
                              >
                                {allCustomer.loading && (
                                  <div className="text-center">
                                    <Spinner
                                      animation="border"
                                      variant="primary"
                                    />
                                  </div>
                                )}
                                {!allCustomer.loading &&
                                  allCustomer?.data?.map((customer, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      onClick={() =>
                                        setSelectedCustomer(customer)
                                      }
                                    >
                                      {customer?.first_name || customer?.name}
                                    </li>
                                  ))}

                                {!allCustomer.loading &&
                                  allCustomer?.data?.length === 0 && (
                                    // <li key="no-customer" className="dropdown-item">
                                    <div
                                      className="d-grid gap-2"
                                      style={{ placeItems: "center" }}
                                    >
                                      <p>No Customer found</p>
                                      <p
                                        className=""
                                        style={{
                                          textDecoration: "underline",
                                          fontWeight: 600,
                                          cursor: "pointer",
                                        }}
                                      >
                                        Create New Customer
                                      </p>
                                    </div>
                                    // </li>
                                  )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedCustomer && selectedCustomer?._id && (
                        <div className="mt-3">
                          <FormGroup>
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Select Pet :
                            </Label>
                            <Input
                              type="select"
                              value={formData.pet}
                              name="pet"
                              disabled={isProcessing}
                              onChange={onChange}
                            >
                              <option value="">--Select--</option>
                              {selectedCustomer?.pet?.map((el, i) => (
                                <option key={i} value={el._id}>
                                  {el?.breed} ({el.name})
                                </option>
                              ))}
                            </Input>
                          </FormGroup>

                          <FormGroup className="mt-2">
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Add Prescription :
                            </Label>
                            <Input
                              type="file"
                              multiple
                              disabled={isProcessing}
                              placeholder="Add prescription"
                              onChange={handleImageChange}
                            />
                          </FormGroup>

                          <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                            <Label className="d-block">
                              <Input
                                className="radio_animated"
                                type="radio"
                                name="type"
                                value="test"
                                onChange={onChange}
                                disabled={isProcessing}
                                checked={formData.type === "test"}
                              />
                              Lab Test
                            </Label>
                            <Label className="d-block mx-4">
                              <Input
                                className="radio_animated"
                                type="radio"
                                name="type"
                                disabled={isProcessing}
                                value="health_package"
                                onChange={onChange}
                                checked={formData.type === "health_package"}
                              />
                              Health Package
                            </Label>
                          </FormGroup>

                          {formData.type === "test" && (
                            <FormGroup>
                              <Label
                                for="exampleSelect"
                                style={{ fontWeight: 600 }}
                              >
                                Select Test :
                              </Label>
                              <Autocomplete
                                sx={{ m: 1 }}
                                multiple
                                options={allTest.data || []}
                                getOptionLabel={(option) =>
                                  `${option?.test_name} (${option?.sell_price})` ||
                                  ""
                                }
                                value={selectedTest}
                                disabled={isProcessing}
                                onChange={(event, newValue) =>
                                  onTestSelect(newValue)
                                }
                                disableCloseOnSelect
                                isOptionEqualToValue={(option, value) =>
                                  option?._id === value?._id
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Select Test"
                                    placeholder="Select Test"
                                  />
                                )}
                              />
                            </FormGroup>
                          )}

                          {formData.type === "health_package" && (
                            <FormGroup>
                              <Label
                                for="exampleSelect"
                                style={{ fontWeight: 600 }}
                              >
                                Select Health Package :
                              </Label>
                              <Input
                                type="select"
                                value={formData.test_package}
                                name="test_package"
                                disabled={isProcessing}
                                onChange={(e) => onPackageSelect(e)}
                              >
                                <option value="">--Select--</option>
                                {test_package?.data?.map((el, i) => (
                                  <option key={i} value={el._id}>
                                    {el?.package_name} ({el?.sell_price})
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                          )}

                          <FormGroup>
                            <Label
                              for="exampleSelect"
                              style={{ fontWeight: 600 }}
                            >
                              Select Professional Fees :
                            </Label>
                            <Autocomplete
                              sx={{ m: 1 }}
                              multiple
                              options={professionalFees?.data || []}
                              getOptionLabel={(option) =>
                                `${option?.name} (${option?.expected_charges})` ||
                                ""
                              }
                              value={selectedFees}
                              onChange={(event, newValue) =>
                                onFeesSelect(newValue)
                              }
                              disableCloseOnSelect
                              disabled={isProcessing}
                              isOptionEqualToValue={(option, value) =>
                                option?._id === value?._id
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Select Professional Fees"
                                  placeholder="Select Professional Fees"
                                />
                              )}
                            />
                          </FormGroup>

                          {totalAmount > 0 && (
                            <>
                              <Label style={{ fontWeight: 600 }}>
                                Payment Mode :
                              </Label>
                              <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                <Label className="d-block">
                                  <Input
                                    className="radio_animated"
                                    type="radio"
                                    name="payment_mode"
                                    value="Cash"
                                    onChange={onChange}
                                    disabled={isProcessing}
                                    checked={formData.payment_mode === "Cash"}
                                  />
                                  CASH
                                </Label>
                                <Label className="d-block mx-4">
                                  <Input
                                    className="radio_animated"
                                    type="radio"
                                    name="payment_mode"
                                    value="UPI"
                                    onChange={onChange}
                                    disabled={isProcessing}
                                    checked={formData.payment_mode === "UPI"}
                                  />
                                  UPI
                                </Label>
                                <Label className="d-block">
                                  <Input
                                    className="radio_animated"
                                    type="radio"
                                    name="payment_mode"
                                    value="Online"
                                    disabled={isProcessing}
                                    onChange={onChange}
                                    checked={formData.payment_mode === "Online"}
                                  />
                                  Pay Online
                                </Label>
                              </FormGroup>
                            </>
                          )}
                        </div>
                      )}
                      <hr className="mt-4" />
                      <div className="d-flex justify-content-between align-items-center">
                        <p
                          className="mb-0"
                          style={{ fontWeight: 600, fontSize: 18 }}
                        >
                          Total Amount : ₹ {totalAmount}
                        </p>
                        <Button
                          color="primary"
                          disabled={
                            totalAmount === 0 ||
                            !formData.payment_mode ||
                            !formData.pet ||
                            isProcessing
                          }
                          onClick={createOrder}
                        >
                          {isProcessing ? (
                            <Spinner size="sm" />
                          ) : (
                            "Create Order"
                          )}
                        </Button>
                      </div>
                    </div>
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

export default CreateOrder;
