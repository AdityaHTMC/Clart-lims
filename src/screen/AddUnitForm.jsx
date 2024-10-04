/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useCategoryContext } from "../helper/CategoryProvider";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const AddUnitForm = () => {
  const navigate = useNavigate();

  const {
    getSubCategoryList,
    addUnit,
  } = useCategoryContext();

  const [inputData, setInputData] = useState({
    organization_name: "",
    contact_person: "",
    mobile: "",
    password: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });

  // useEffect(() => {
  //   getCategoryList();
  //   getVarityList();
  //   getBrandList();
  //   getpackList();
  //   getUnitList();
  //   getBagTypeList();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOfferEndDateChange = (e) => {
    const { value } = e.target;

    // Convert the date to ISO format
    const formattedDate = new Date(value).toISOString();

    setInputData((prevData) => ({
      ...prevData,
      offer_end_date: formattedDate,
    }));
  };

  const handleDescriptionChange = (value) => {
    setInputData((prevState) => ({
      ...prevState,
      description: value,
    }));
  };


  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setInputData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...selectedFiles], // Append new images
    }));
  };

  const removeImage = (index) => {
    setInputData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index), // Remove image at index
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("organization_name", inputData.organization_name);
    formDataToSend.append("contact_person", inputData.contact_person);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("password", inputData.password);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("address", inputData.address );
    formDataToSend.append("district", inputData.district );
    formDataToSend.append("state", inputData.state );
    formDataToSend.append("pincode", inputData.pincode );
  
    // inputData.images.forEach((image, index) => {
    //   formDataToSend.append(`images[${index}]`, image);
    // });

    addUnit(formDataToSend);

    console.log(formDataToSend);
  };

  return (
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
              <Label for="title">Organization Name *</Label>
              <Input
                type="text"
                name="organization_name"
                value={inputData.organization_name}
            
                onChange={handleInputChange}
                id="organization_name"
                required
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="contact_person" className="col-form-label">
              Contact Person:
              </Label>
              <Input
                type="text"
                name="contact_person"
                value={inputData.contact_person}
                onChange={handleInputChange}
                id="contact_person"
              />
            </FormGroup>
          </div>
        </div>

        {/* First row with two col-md-6 */}
        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="mobile" className="col-form-label">
                Mobile:
              </Label>
              <Input
                type="number"
                name="mobile"
                value={inputData.mobile}
                onChange={handleInputChange}
                id="mobile"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="password" className="col-form-label">
                Password:
              </Label>
              <Input
                type="password"
                name="password"
                value={inputData.password}
                onChange={handleInputChange}
                id="password"
              />
            </FormGroup>
          </div>
        </div>

        {/* Second row with two col-md-6 */}

        {/* Continue adding pairs in rows */}
        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="email" className="col-form-label">
                email:
              </Label>
              <Input
                type="email"
                name="email"
                value={inputData.email}
                onChange={handleInputChange}
                id="email"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="address" className="col-form-label">
                Address:
              </Label>
              <Input
                type="text"
                name="address"
                value={inputData.address}
                onChange={handleInputChange}
                id="address"
              />
            </FormGroup>
          </div>
        </div>

        {/* Add the remaining inputs similarly, organizing them into rows as needed */}
        <div className="row">
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="district" className="col-form-label">
                District:
              </Label>
              <Input
                type="text"
                name="district"
                value={inputData.district}
                onChange={handleInputChange}
                id="district"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="state" className="col-form-label">
                State:
              </Label>
              <Input
                type="text"
                name="state"
                value={inputData.state}
                onChange={handleInputChange}
                id="state"
              />
            </FormGroup>
          </div>
        </div>

        {/* Continue the pattern for the rest of the form */}

        <div className="row">
         
          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="pincode" className="col-form-label">
                Pincode:
              </Label>
              <Input
                type="text"
                name="pincode"
                value={inputData.pincode}
                onChange={handleInputChange}
                id="pincode"
              />
            </FormGroup>
          </div>

          <div className="col-md-6">
            <FormGroup>
              <Label htmlFor="images" className="col-form-label">
                Upload Images:
              </Label>
              <Input
                type="file"
                name="images"
                id="images"
                onChange={handleImageChange}
                multiple
               
              />
            </FormGroup>
          </div>
        </div>

     

        {/* Image previews */}
        <div className="row">
          {inputData.images?.length > 0 && (
            <div className="col-md-12">
              <div
                className="image-preview-container"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {inputData.images.map((image, index) => (
                  <div
                    key={index}
                    className="image-preview"
                    style={{ position: "relative", margin: "5px" }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash style={{ color: "red" }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button type="submit" color="primary">
          Add Unit
        </Button>
      </form>
    </div>
  );
};

export default AddUnitForm;
