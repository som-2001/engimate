import { Box } from "@mui/material"

import { MyCourse } from "./MyCourse";
import axios from "axios";
import { useEffect } from "react";
import { BaseUrl } from "../components/BaseUrl";

export const UserDashboard=()=>{
   
  useEffect(()=>{
    axios
    .get(`${BaseUrl}/user/profile`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      sessionStorage.setItem('name',res.data.user.name);
    }).catch((error)=>{
      console.log(error);
      if(error?.reponse?.data?.message==='login first or token expired')
      {
        window.location.href='/login';
      }
    })
  },[]);
 
  return(
    <Box>
        <MyCourse/>
    </Box>
  )
}