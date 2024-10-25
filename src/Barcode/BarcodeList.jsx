/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useDashboardContext } from "../helper/DashboardProvider";
import { Pagination, Stack } from "@mui/material";

const BarcodeList = () => {
  const navigate = useNavigate();

  const { getbarcode, barcode,generateBarcode } = useDashboardContext();
  const [selectedStatus, setSelectedStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 15;

  const totalPages = barcode?.total && Math.ceil(barcode?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      ...selectedStatus, // Pass selected status in the payload
    };
    getbarcode(dataToSend);
  }, [currentPage, selectedStatus]);

  console.log(barcode, "barcode");

  const generatebar = ()=>{
    const dataToSend = {
      quantity: 10
    }

    generateBarcode(dataToSend)
  }

  const onOpenModal = () => {
    navigate("/add-test-packages");
  };
  const handleEdit = (id) => {
    navigate(`/testpackage-edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      //  tpDelete(id);
    }
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Barcode List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                    <Button color="primary" onClick={generatebar}>
                      Generate Barcode
                    </Button>
                  </div>
                <div className="d-flex gap-2 flex-wrap mb-3">
                  <Button
                    color={!selectedStatus.isPrinted && !selectedStatus.isUsed ? "primary" : "danger"}
                    style={{ minWidth: "max-content" }}
                    onClick={() => setSelectedStatus({})} // No additional parameter for "All"
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    color={selectedStatus.isUsed ? "primary" : "danger"}
                    style={{ minWidth: "max-content" }}
                    onClick={() => setSelectedStatus({ isUsed: true })} // Pass isUsed: true for "Used"
                    size="sm"
                  >
                    Used
                  </Button>
                  <Button
                    color={selectedStatus.isPrinted ? "primary" : "danger"}
                    style={{ minWidth: "max-content" }}
                    onClick={() => setSelectedStatus({ isPrinted: true })} // Pass isPrinted: true for "Printed"
                    size="sm"
                  >
                    Printed
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th> Bar Code </th>
                          <th>code</th>
                          <th>Is Used ?</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {barcode?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : barcode?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Barcode Found
                            </td>
                          </tr>
                        ) : (
                          barcode?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>
                                {" "}
                                <img
                                  src={product.bar_code}
                                  alt="img"
                                  style={{
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                  }}
                                />{" "}
                              </td>
                              <td>{product.code}</td>
                              <td>{product.isUsed ? "Yes" : "No"}</td>

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
                      <Stack className="rightPagination mt10" spacing={2}>
                        <Pagination
                          color="primary"
                          count={totalPages}
                          page={currentPage}
                          shape="rounded"
                          onChange={(event, value) => handlepagechange(value)}
                        />
                      </Stack>
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

export default BarcodeList;
