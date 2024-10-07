/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
const AddTestList = () => {
  const navigate = useNavigate();

  const {
    addlab,
    getAllTestCategory,
    addTest,
    alltestCategory,
  } = useMasterContext();

  useEffect(() => {
    getAllTestCategory();
  }, []);

  const [inputData, setInputData] = useState({
    test_name: "",
    group: "",
    price: "",
    sell_price: "",
    collection_fee: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProducts2, setSelectedProducts2] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();


    const formDataToSend = new FormData();

    formDataToSend.append("test_name", inputData.test_name);
    formDataToSend.append("group", inputData.group);
    formDataToSend.append("price", inputData.price);
    formDataToSend.append("sell_price", inputData.sell_price);
    formDataToSend.append("collection_fee", inputData.collection_fee);
   
    addTest(formDataToSend);

    console.log(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Test" />
      <div className="product-form-container" style={{ padding: "2px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="test_name">Test Name *</Label>
                <Input
                  type="text"
                  name="test_name"
                  value={inputData.test_name}
                  onChange={handleInputChange}
                  id="test_name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="price" className="col-form-label">
                  price:
                </Label>
                <Input
                  type="number"
                  name="price"
                  value={inputData.price}
                  onChange={handleInputChange}
                  id="price"
                />
              </FormGroup>
            </div>
          </div>

          {/* First row with two col-md-6 */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="sell_price" className="col-form-label">
                  Sell Price:
                </Label>
                <Input
                  type="number"
                  name="sell_price"
                  value={inputData.sell_price}
                  onChange={handleInputChange}
                  id="sell_price"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="collection_fee" className="col-form-label">
                 Collection Fee:
                </Label>
                <Input
                  type="number"
                  name="collection_fee"
                  value={inputData.collection_fee}
                  onChange={handleInputChange}
                  id="collection_fee"
                />
              </FormGroup>
            </div>
          </div>

          {/* Second row with two col-md-6 */}

          {/* Continue adding pairs in rows */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="group" className="col-form-label">
                  Group:
                </Label>
                <Input
                  type="select"
                  name="group"
                  value={inputData.group}
                  onChange={handleInputChange}
                  id="group"
                >
                  <option value="">Select Group</option>
                  {alltestCategory?.data?.map((variety) => (
                    <option key={variety._id} value={variety._id}>
                      {variety.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>

          <Button type="submit" color="primary">
            Add Lab
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTestList;
