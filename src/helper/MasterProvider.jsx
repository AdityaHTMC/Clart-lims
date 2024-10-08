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
  const [testCategory, settestCategory] = useState({loading: true,data: [],total: ""});
  const [testList, settestList] = useState({loading: true,data: [],total: ""});
  const [professionalList, setprofessionalList] = useState({loading: true,data: [],total: ""});
  const [testpackageList, settestpackageList] = useState({loading: true,data: [],total: ""});
  const [taskList, setTaskList] = useState({loading: true,data: [],total: ""});
  const [allbreed, setallbreed] = useState({loading: true,data: []});
  const [alltestCategory, setalltestCategory] = useState({loading: true,data: []});
  const [alltest, setalltest] = useState({loading: true,data: []});
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

  const gettestCategoryList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-categories/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settestCategory({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        settestCategory({ data: [], total: "", loading: false });
        toast.error("Failed to fetch customer list");
      }
    } catch (error) {
      settestCategory({ data: [], total: "", loading: false });
      toast.error("Failed to fetch customer list");
    }
  };


  const addtestCategory = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-category/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Test category added successfully");
        navigate("/test-categories");
      } else {
        toast.error("Failed to add Test category");
      }
    } catch (error) {
      console.error("Error adding Test category:", error);
      toast.error("An error occurred while adding the Test category");
    }
  };


  const gettestTestList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settestList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        settestList({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      settestList({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
    }
  };


  const addTest = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Test category added successfully");
        navigate("/test-list");
      } else {
        toast.error("Failed to add Test category");
      }
    } catch (error) {
      console.error("Error adding Test category:", error);
      toast.error("An error occurred while adding the Test category");
    }
  };

  const getAllTestCategory = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/test-categories`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setalltestCategory({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setalltestCategory({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test category list");
      }
    } catch (error) {
      setalltestCategory({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test category list");
    }
  };

  const getProfessionalList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/professional-fee/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setprofessionalList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setprofessionalList({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test category list");
      }
    } catch (error) {
      setprofessionalList({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test category list");
    }
  };


  const addProfessional = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/professional-fee/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Test category added successfully");
        getProfessionalList()
      } else {
        toast.error("Failed to add Test category");
      }
    } catch (error) {
      console.error("Error adding Test category:", error);
      toast.error("An error occurred while adding the Test category");
    }
  };


  const getAllTest = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/all/tests`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setalltest({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setalltest({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      setalltest({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
    }
  };

  const addtestPackage = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-package/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Test package added successfully");
       navigate('/test-packages')
      } else {
        toast.error("Failed to add Test category");
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error("An error occurred while adding the Test package");
    }
  };

  const getAllTestPackage = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/test-package/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        settestpackageList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        settestpackageList({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      settestpackageList({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
    }
  };


  const addtask = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/task/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json' ,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Task management added successfully");
       navigate('/task-management')
      } else {
        toast.error("Failed to add Task management");
      }
    } catch (error) {
      console.error("Error adding Test package:", error);
      toast.error("An error occurred while adding the Task management");
    }
  };


  const getTaskList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/task/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setTaskList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setTaskList({ data: [], total: "", loading: false });
        toast.error("Failed to fetch test list");
      }
    } catch (error) {
      setTaskList({ data: [], total: "", loading: false });
      toast.error("Failed to fetch test list");
    }
  };



  const values = {
    addBreed , breedLists , getBreedList , allBreedList,allbreed,addCustomer,allCustomerList,customerLists,testCategory, gettestCategoryList,addtestCategory,gettestTestList,testList,addTest,getAllTestCategory,alltestCategory,getProfessionalList,professionalList,addProfessional,getAllTest, alltest,addtestPackage,getAllTestPackage , testpackageList , addtask ,getTaskList , taskList

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
