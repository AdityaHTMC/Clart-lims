/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {  Box, Typography } from "@mui/material";
import { AccessTime, ShoppingBag, Sync, LocalShipping, CheckCircle, Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { useDashboardContext } from "../../helper/DashboardProvider";

const OrderAnalytics = () => {
  const data = [
    { label: "Pending", value: 351, icon: <AccessTime />, link: "/pending" },
    { label: "Confirm", value: 361, icon: <ShoppingBag />, link: "/confirm" },
    { label: "Processing", value: 6, icon: <Sync />, link: "/processing" },
    { label: "Pickup", value: 1, icon: <LocalShipping />, link: "/pickup" },
    { label: "On The Way", value: 5, icon: <LocalShipping />, link: "/on-the-way" },
    { label: "Delivered", value: 99, icon: <CheckCircle />, link: "/delivered" },
    { label: "Cancelled", value: 60, icon: <Cancel />, link: "/cancelled" },
  ];

  const { getDashboardOrderCount,dashboardOrderCount } = useDashboardContext();

  // useEffect(() => {
  //   getDashboardOrderCount();
  // }, []);

  console.log(dashboardOrderCount,'dashboardOrdercount')

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      <Typography variant="h6" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
        Order Analytics
      </Typography>
      <Grid container spacing={2}>
    
          <Grid item xs={6} sm={4} md={3} >
            <Link to='/pending-orders'  style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f3f5",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Smoother transition
                  transform: "scale(1)", // Normal scale
                  "&:hover": {
                    backgroundColor: "#e2e6ea",
                    transform: "scale(1.05)", // Scale up by 5%
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AccessTime />
                  <Typography> Pending </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft:'15px', boxShadow:'0 0 0 0.4rem #e2e8f0', borderRadius:'50%',width:'39px', height:'39px', background:'#f1f5f9', color:'#000',fontSize:'16px', display: 'flex', padding:'4px 8px',alignItems:'center' }}>
                {dashboardOrderCount.data.pending_orders}
                </Typography>
              </Box>
            </Link>
          </Grid>

          {/* <Grid item xs={6} sm={4} md={3} >
            <Link to='/completed-orders' style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f3f5",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Smoother transition
                  transform: "scale(1)", // Normal scale
                  "&:hover": {
                    backgroundColor: "#e2e6ea",
                    transform: "scale(1.05)", // Scale up by 5%
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle />
                  <Typography> Completed</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft:'15px', boxShadow:'0 0 0 0.4rem #e2e8f0', borderRadius:'50%',width:'39px', height:'39px', background:'#f1f5f9', color:'#000',fontSize:'16px', display: 'flex', padding:'4px 8px',alignItems:'center' }}>
                {dashboardOrderCount.data.completed_orders}
                </Typography>
              </Box>
            </Link>
          </Grid> */}


          <Grid item xs={6} sm={4} md={3} >
            <Link to='/confirmed-orders' style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f3f5",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Smoother transition
                  transform: "scale(1)", // Normal scale
                  "&:hover": {
                    backgroundColor: "#e2e6ea",
                    transform: "scale(1.05)", // Scale up by 5%
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingBag />
                  <Typography> Confirmed</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft:'15px', boxShadow:'0 0 0 0.4rem #e2e8f0', borderRadius:'50%',width:'39px', height:'39px', background:'#f1f5f9', color:'#000',fontSize:'16px', display: 'flex', padding:'4px 8px',alignItems:'center' }}>
                {dashboardOrderCount.data.confirmed_orders}
                </Typography>
              </Box>
            </Link>
          </Grid>


          <Grid item xs={6} sm={4} md={3} >
            <Link to='/cancelled-orders' style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f3f5",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Smoother transition
                  transform: "scale(1)", // Normal scale
                  "&:hover": {
                    backgroundColor: "#e2e6ea",
                    transform: "scale(1.05)", // Scale up by 5%
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Cancel />
                  <Typography> Cancelled</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft:'15px', boxShadow:'0 0 0 0.4rem #e2e8f0', borderRadius:'50%',width:'39px', height:'39px', background:'#f1f5f9', color:'#000',fontSize:'16px', display: 'flex', padding:'4px 8px',alignItems:'center' }}>
                {dashboardOrderCount.data.cancelled_orders}
                </Typography>
              </Box>
            </Link>
          </Grid>


          <Grid item xs={6} sm={4} md={3} >
            <Link to='/processing-orders' style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f3f5",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Smoother transition
                  transform: "scale(1)", // Normal scale
                  "&:hover": {
                    backgroundColor: "#e2e6ea",
                    transform: "scale(1.05)", // Scale up by 5%
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Sync />
                  <Typography> Processing</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft:'15px', boxShadow:'0 0 0 0.4rem #e2e8f0', borderRadius:'50%',width:'39px', height:'39px', background:'#f1f5f9', color:'#000',fontSize:'16px', display: 'flex', padding:'4px 8px',alignItems:'center' }}>
                {dashboardOrderCount.data.processing_orders}
                </Typography>
              </Box>
            </Link>
          </Grid>


          <Grid item xs={6} sm={4} md={3} >
            <Link to='/pickup-orders' style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f3f5",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Smoother transition
                  transform: "scale(1)", // Normal scale
                  "&:hover": {
                    backgroundColor: "#e2e6ea",
                    transform: "scale(1.05)", // Scale up by 5%
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LocalShipping />
                  <Typography> Pickup</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft:'15px', boxShadow:'0 0 0 0.4rem #e2e8f0', borderRadius:'50%',width:'39px', height:'39px', background:'#f1f5f9', color:'#000',fontSize:'16px', display: 'flex', padding:'4px 8px',alignItems:'center' }}>
                {dashboardOrderCount.data.pickup_orders}
                </Typography>
              </Box>
            </Link>
          </Grid>

          <Grid item xs={6} sm={4} md={3} >
            <Link to='/on-the-way-orders' style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f3f5",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Smoother transition
                  transform: "scale(1)", // Normal scale
                  "&:hover": {
                    backgroundColor: "#e2e6ea",
                    transform: "scale(1.05)", // Scale up by 5%
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <LocalShipping />
                  <Typography> On The Way</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft:'15px', boxShadow:'0 0 0 0.4rem #e2e8f0', borderRadius:'50%',width:'39px', height:'39px', background:'#f1f5f9', color:'#000',fontSize:'16px', display: 'flex', padding:'4px 8px',alignItems:'center' }}>
                {dashboardOrderCount.data.on_the_way_orders}
                </Typography>
              </Box>
            </Link>
          </Grid>


          <Grid item xs={6} sm={4} md={3} >
            <Link to='/delivered-orders' style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#f0f3f5",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Smoother transition
                  transform: "scale(1)", // Normal scale
                  "&:hover": {
                    backgroundColor: "#e2e6ea",
                    transform: "scale(1.05)", // Scale up by 5%
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Stronger shadow
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle />
                  <Typography> Delivered</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft:'15px', boxShadow:'0 0 0 0.4rem #e2e8f0', borderRadius:'50%',width:'39px', height:'39px', background:'#f1f5f9', color:'#000',fontSize:'16px', display: 'flex', padding:'4px 8px',alignItems:'center' }}>
                {dashboardOrderCount.data.delivered_orders}
                </Typography>
              </Box>
            </Link>
          </Grid>
  
      </Grid>
    </Box>
  );
};

export default OrderAnalytics;
