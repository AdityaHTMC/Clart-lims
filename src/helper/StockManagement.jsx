/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const StockProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [cmsList, setCmsList] = useState({ loading: true, data: [] })
    const [itemgroup, setitemgroup] = useState({loading: true,data: [],total: ""});
    
    const { Authtoken } = useAuthContext()
    const AuthToken = localStorage.getItem('Authtoken')


    const getCmsList = async (data) => {
        try {
          const response = await axios.post(
            `${base_url}/cms/list`,
            {},
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setCmsList({ data: response?.data?.data || [], loading: false });
          } else {
            setCmsList({...cmsList, loading: false});
            toast.error("Failed to fetch Bag Type list");
          }
        } catch (error) {
            setCmsList({...cmsList, loading: false});
          toast.error(error.response?.data?.message || 'Server error');
        }
      };



      const addCms = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/cms/add`,
            formDataToSend,  // Pass FormData directly without spreading
            { 
              headers: { 
                Authorization: AuthToken,
                'Content-Type': 'application/json' 
              }
            }
          );
          if (response.status === 200) {
            toast.success('CMS added successfully');
            getCmsList();  // Refresh the banner list after success
          } else {
            toast.error("Failed to add CMS ");
          }
        } catch (error) {
          console.error("Error adding CMS:", error);
          toast.error("An error occurred while adding the CMS ");
        }
      };

      const getItemGrList = async () => {
        try {
          const response = await axios.post(
            `${base_url}/admin/item-group/list `,{},
            { headers: { Authorization: AuthToken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setitemgroup({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setitemgroup({ data: [], loading: false });
            toast.error("server errrors");
          }
        } catch (error) {
            setitemgroup({ data: [], loading: false });
            toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const addItemGr = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/item-group/add`,
            formDataToSend, 
            { 
              headers: { 
                Authorization: AuthToken,
                'Content-Type': 'application/json' 
              }
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            getItemGrList()
          } else {
            toast.error("server errrors");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

    

    const values = {
         getCmsList ,cmsList ,addCms , getItemGrList, itemgroup,addItemGr
    }
    return (
        <AppContext.Provider value={values} >
            {children}
        </AppContext.Provider>
    );
};

export const useStockContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};