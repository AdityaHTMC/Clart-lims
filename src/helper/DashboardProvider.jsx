/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const DashboardProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [cmsList, setCmsList] = useState({ loading: true, data: [] })
    const [dashboardOrderList, setDashboardOrderList] = useState({ loading: true, data: [] })
    const [dashboardOrderCount, setDashboardOrderCount] = useState({ loading: true, data: [] })
    const [orderStatus, setOrderStatus] = useState({ loading: true, data: [] });
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



      const getDashboardOrderList = async (data) => {
        try {
          const response = await axios.post(
            `${base_url}/latest/orders/list`,
            {},
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setDashboardOrderList({ data: response?.data?.data || [], loading: false });
          } else {
            setDashboardOrderList({data:[], loading: false});
            toast.error("Failed to fetch Bag Type list");
          }
        } catch (error) {
            setDashboardOrderList({data:[], loading: false});
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      
      const getDashboardOrderCount = async (data) => {
        try {
          const response = await axios.get(
            `${base_url}/admin/dashboard/order/count`,
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setDashboardOrderCount({ data: response?.data?.data || [], loading: false });
          } else {
            setDashboardOrderCount({data:[], loading: false});
            toast.error("Failed to fetch Bag Type list");
          }
        } catch (error) {
          setDashboardOrderCount({data:[], loading: false});
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


  const getAllOrderStatus = async () => {
        try {
            const response = await axios.get(
                `${base_url}/admin/dashboard/order/count`,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setOrderStatus({
                    data: response?.data?.data || [],
                    loading: false,
                });
            } else {
                setOrderStatus({ data: [], loading: false });
            }
        } catch (error) {
            setOrderStatus({ data: [], loading: false });
            // toast.error("Failed to test list");
        }
    };




    const values = {
       getCmsList ,cmsList ,getDashboardOrderList,dashboardOrderList,getDashboardOrderCount,dashboardOrderCount,getAllOrderStatus , orderStatus
    }
    return (
        <AppContext.Provider value={values} >
            {children}
        </AppContext.Provider>
    );
};

export const useDashboardContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};