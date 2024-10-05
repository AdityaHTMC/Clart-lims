/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

export const MasterProvider = ({ children }) => {
  const navigate = useNavigate();
  const [unitLists, setUnitLists] = useState({loading: true,data: [],total: ""});
  const [breedLists, setbreedLists] = useState({loading: true,data: [],total: ""});
  const [customerLists, setcustomerLists] = useState({loading: true,data: [],total: ""});
  const [allbreed, setallbreed] = useState({loading: true,data: []});
  const AuthToken = localStorage.getItem("Authtoken");
  // console.log(AuthToken)
  const base_url = import.meta.env.VITE_API_URL;

  const getunitList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/unit/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setUnitLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setUnitLists({ data: [], total: "", loading: false });
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setUnitLists({ data: [], total: "", loading: false });
      toast.error("Failed to fetch product list");
    }
  };

  const addUnit = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/unit/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", // Set correct content type for FormData
          },
        }
      );
      if (response.status === 200) {
        toast.success("Unit added successfully");
        navigate("/unit-list");
      } else {
        toast.error("Failed to add Unit");
      }
    } catch (error) {
      console.error("Error adding Unit:", error);
      toast.error("An error occurred while adding the Unit");
    }
  };

  const addBreed = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/breed/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", // Set correct content type for FormData
          },
        }
      );
      if (response.status === 200) {
        toast.success("Breed added successfully");
        navigate("/breed-management");
      } else {
        toast.error("Failed to add Breed");
      }
    } catch (error) {
      console.error("Error adding Breed:", error);
      toast.error("An error occurred while adding the Breed");
    }
  };

  const getBreedList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/breed/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setbreedLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setbreedLists({ data: [], total: "", loading: false });
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setbreedLists({ data: [], total: "", loading: false });
      toast.error("Failed to fetch product list");
    }
  };


  const allBreedList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/breeds`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallbreed({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setallbreed({ data: [], total: "", loading: false });
        toast.error("Failed to fetch breed list");
      }
    } catch (error) {
        setallbreed({ data: [], total: "", loading: false });
      toast.error("Failed to fetch breed list");
    }
  };

  const addCustomer = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/customer/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", // Set correct content type for FormData
          },
        }
      );
      if (response.status === 200) {
        toast.success("customer added successfully");
        navigate("/customers-list");
      } else {
        toast.error("Failed to add customer");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("An error occurred while adding the customer");
    }
  };

  const allCustomerList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/customers/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setcustomerLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setcustomerLists({ data: [], total: "", loading: false });
        toast.error("Failed to fetch customer list");
      }
    } catch (error) {
        setcustomerLists({ data: [], total: "", loading: false });
      toast.error("Failed to fetch customer list");
    }
  };


  const values = {
    addBreed , breedLists , getBreedList , allBreedList,allbreed,addCustomer,allCustomerList,customerLists
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useMasterContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
