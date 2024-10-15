import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, Skeleton, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Stats = () => {
  const [stats, setStats] = useState([]);
  const navigate=useNavigate();
  const [load,setLoad]=useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURl}/stats/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        setStats(res?.data?.stats);
      })
      .catch((error) => {
        setLoad(false);
        toast.error(error?.response?.data?.message, { autoClose: 3000 });
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  }, [navigate]);

  const data = {
    labels: ["Courses", "Lectures", "Users"],
    datasets: [
      {
        label: "Statistics",
        data: [stats.totalCourse, stats.totalLectures, stats.totalUsers],
        backgroundColor: ["#3f51b5", "#4caf50", "#f50057"],
        borderColor: ["#3f51b5", "#4caf50", "#f50057"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        padding: 3,
      }}
    >
      <Box
        
        sx={{
          padding: 4,
          borderRadius: 4,
          maxWidth: 600,
          width: "100%",
        //   backgroundColor: "#fff",
        }}
      >
       
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={12} md={6} sx={{display:{xs:"none",sm:"none",md:"block",lg:"block"}}}>
            {load ? <Skeleton variant="circular">
              <Avatar sx={{fontSize:"14rem"}} />
            </Skeleton>:<Pie data={data} options={options} />}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total Courses
              </Typography>
              <Typography variant="h5" color="primary">
                {load ?<Skeleton animation="wave" />:stats.totalCourse}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                Total Lectures
              </Typography>
              <Typography variant="h5" color="secondary">
              {load ?<Skeleton animation="wave" />:stats.totalLectures}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
                Total Users
              </Typography>
              <Typography variant="h5" color="error">
              {load ?<Skeleton animation="wave" />:stats.totalUsers}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
