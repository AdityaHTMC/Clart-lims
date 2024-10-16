/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Autocomplete, Chip, TextField } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";

const AddTestPackage = () => {
  const navigate = useNavigate();

  const {
    addtestPackage,getAllTest, alltest
  } = useMasterContext();

  useEffect(()=>{
    getAllTest()
  },[])

  const [inputData, setInputData] = useState({
    package_name: "",
    description: "",
    tests: [],
    sample_type: "",
    turn_around_time: "",
    price: "",
    sell_price: "",
  });

  const [selectedProducts, setSelectedProducts] = useState([]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const allSelectedProductIds = [
      ...selectedProducts.map(product => product._id)
    ];
    


    const formDataToSend = new FormData();

    formDataToSend.append("package_name", inputData.package_name);
    formDataToSend.append("description", inputData.description);
    formDataToSend.append("sample_type", inputData.sample_type);
    formDataToSend.append("turn_around_time", inputData.turn_around_time);
    formDataToSend.append("price", inputData.price);
    formDataToSend.append("sell_price", inputData.sell_price );
    allSelectedProductIds.forEach((id, index) => {
      formDataToSend.append(`tests[${index}]`, id);
    });
  

    addtestPackage(formDataToSend);


  };

  return (
    <>
      <CommonBreadcrumb title="Add Test Package" />
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
                <Label for="package_name">Package Name *</Label>
                <Input
                  type="text"
                  name="package_name"
                  value={inputData.package_name}
                  onChange={handleInputChange}
                  id="package_name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="description" className="col-form-label">
                  Description:
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={inputData.description}
                  onChange={handleInputChange}
                  id="description"
                />
              </FormGroup>
            </div>
          </div>

          {/* First row with two col-md-6 */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="mobile" className="col-form-label">
                  Sample Type:
                </Label>
                <Input
                  type="text"
                  name="sample_type"
                  value={inputData.sample_type}
                  onChange={handleInputChange}
                  id="sample_type"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="turn_around_time" className="col-form-label">
                  Turn Around Time:
                </Label>
                <Input
                  type="date"
                  name="turn_around_time"
                  value={inputData.turn_around_time}
                  onChange={handleInputChange}
                  id="turn_around_time"
                />
              </FormGroup>
            </div>
          </div>

          {/* Second row with two col-md-6 */}

          {/* Continue adding pairs in rows */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="price" className="col-form-label">
                  Price:
                </Label>
                <Input
                  type="text"
                  name="price"
                  value={inputData.price}
                  onChange={handleInputChange}
                  id="price"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="sell_price" className="col-form-label">
                  Sell Price:
                </Label>
                <Input
                  type="text"
                  name="sell_price"
                  value={inputData.sell_price}
                  onChange={handleInputChange}
                  id="sell_price"
                />
              </FormGroup>
            </div>
          </div>

          {/* Add the remaining inputs similarly, organizing them into rows as needed */}

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="New">Test</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={alltest?.data || []}
                  getOptionLabel={(option) => option?.test_name || ""}
                  value={selectedProducts}
                  onChange={(event, newValue) => setSelectedProducts(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Collection Center"
                      placeholder="Select Collection Center"
                    />
                  )}
                />
              </FormGroup>
            </div>
          </div>

          <Button type="submit" color="primary">
            Add Test Package
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTestPackage;