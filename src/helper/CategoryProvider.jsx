/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

export const CategoryProvider = ({ children }) => {
  const navigate = useNavigate();
  const [unitLists, setUnitLists] = useState({loading: true,data: [],total: ""});
  const [labLists, setLabLists] = useState({loading: true,data: [],total: ""});
  const [collectionLists, setCollectionLists] = useState({loading: true,data: [],total: ""});
  const [collectionDropdown, setCollectionDropdown] = useState({loading: true,data: []});
  const [labDropdown, setlabDropdown] = useState({loading: true,data: []});
  const [unitDropdown, setUnitDropdown] = useState({loading: true,data: []});
  const [phlebotomistList, setPhlebotomistList] = useState({loading: true,data: [],total: ""});
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

  const getLabsList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/lab/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setLabLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setLabLists({ data: [], total: "", loading: false });
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setLabLists({ data: [], total: "", loading: false });
      toast.error("Failed to fetch product list");
    }
  };

  const addlab = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/lab/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", // Set correct content type for FormData
          },
        }
      );
      if (response.status === 200) {
        toast.success("Lab added successfully");
        navigate("/lab-list");
      } else {
        toast.error("Failed to add Lab");
      }
    } catch (error) {
      console.error("Error adding Lab:", error);
      toast.error("An error occurred while adding the Lab");
    }
  };

  const getCollectionList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/collection-center/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setCollectionLists({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setCollectionLists({ data: [], total: "", loading: false });
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setCollectionLists({ data: [], total: "", loading: false });
      toast.error("Failed to fetch product list");
    }
  };


  const addCollection = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/collection-center/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", // Set correct content type for FormData
          },
        }
      );
      if (response.status === 200) {
        toast.success("Collection Center  added successfully");
        navigate("Collection Center -center-list");
      } else {
        toast.error("Failed to add Collection Center ");
      }
    } catch (error) {
      
      toast.error("An error occurred while adding the Collection Center ");
    }
  };

  const getAllCollection = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/collection-centers`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setCollectionDropdown({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setCollectionDropdown({ data: [],  loading: false });
        // toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setCollectionDropdown({ data: [], loading: false });
      toast.error("Failed to fetch Collection Center list");
    }
  };


  const getAllLabs = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/labs`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setlabDropdown({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setlabDropdown({ data: [],  loading: false });
        // toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setlabDropdown({ data: [], loading: false });
      toast.error("Failed to fetch labs Center list");
    }
  };

  const getAllUnit = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/units`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setUnitDropdown({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setUnitDropdown({ data: [],  loading: false });
        // toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setUnitDropdown({ data: [], loading: false });
      toast.error("Failed to fetch unit Center list");
    }
  };


  const getAllphlebotomist = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/phlebotomist/list`,
        {...dataToSend},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setPhlebotomistList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setPhlebotomistList({ data: [],  loading: false });
        // toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setPhlebotomistList({ data: [], loading: false });
      toast.error("Failed to fetch unit Center list");
    }
  };

  const addphlebotomist = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/phlebotomist/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      if (response.status === 200) {
        toast.success("phlebotomist added successfully");
        navigate("/phlebotomist-list");
      } else {
        toast.error("Failed to add phlebotomist ");
      }
    } catch (error) {
      
      toast.error("An error occurred while adding the phlebotomist ");
    }
  };


  const values = {
   getunitList,unitLists, addUnit,getLabsList,labLists,addlab , getCollectionList ,collectionLists,addCollection,getAllCollection,collectionDropdown,getAllLabs,labDropdown,getAllUnit,unitDropdown,getAllphlebotomist,phlebotomistList,addphlebotomist
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useCategoryContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
