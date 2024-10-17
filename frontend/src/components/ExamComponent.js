import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
dayjs.extend(advancedFormat);

const validationSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("file is required")
    .test("filePdf", "Only pdf file is accepted", (value) => {
      if (!value || value?.[0]?.type !== "application/pdf") return false;
      else if (value?.[0]?.type === "application/pdf") return true;
    })
    .test("fileSize", "file size should be less than 5mb", (value) => {
      if (!value || value?.[0]?.type !== "application/pdf") return false;
      else if (value?.[0]?.size <= 5 * 1024 * 1024) return true;
    }),
});

export const ExamComponent = ({ exam, setExam, loadExam, setLoadExam }) => {
  const navigate = useNavigate();
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfDownload, setpdfDownload] = useState("");
  const [openpdfDialog, setOpenpdfDialog] = useState(false);
  const [name, setName] = useState("");
  const [hide,setHide]=useState(true);
  const [id, setId] = useState(null);

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCloseDialog1 = () => {
    setOpenpdfDialog(false);
    setSelectedPdf(null);
    setName("");
    reset();
  };

  const handleCardClick1 = (data) => {
    setSelectedPdf(data);
    setId(data._id);
    axios
      .get(`${process.env.REACT_APP_BASEURl}/exam/download/${data._id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setHide(true);
        toast.success(res.data.message, { autoClose: 3000 });
        const base64Pdf = res?.data?.fileData?.split(",")[1]; // Extract base64 part
        const binaryPdf = atob(base64Pdf); // Convert base64 to binary data

        // Create an array buffer for the binary data
        const len = binaryPdf.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryPdf.charCodeAt(i);
        }

        // Create a Blob with the PDF binary data
        const blob = new Blob([bytes], { type: "application/pdf" });

        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);
        console.log("URL:", url);
        setpdfDownload(url);
        // console.log(res?.data?.dpp?.fileData?.[0])
      })
      .catch((error) => {
        console.error("Error fetching categories", error);

        if(error?.response?.data?.message==='You have not applied for this exam.')
        {
            setHide(false);
        }
        toast.error(error?.response?.data?.message, { autoClose: 3000 });

        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
    setOpenpdfDialog(true);
  };

  const ApplyExamForm = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURl}/exam/apply/`,
        { examId: id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message, { autoClose: 3000 });
      })
      .catch((error) => {
        console.error("Error fetching courses", error);
        toast.error(error?.response?.data?.message, { autoClose: 3000 });
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  };

  const onSubmit1 = (data) => {

    axios
      .get(
        `${process.env.REACT_APP_BASEURl}/exam/applicationId/${id}`,{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      ).then(res=>{
        const formData = new FormData();
        console.log(data.file);
        formData.append("file", data.file[0]);
        axios
          .post(
            `${process.env.REACT_APP_BASEURl}/submitExam/${res.data.applicationId}`,formData,{
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            toast.success(res.data.message, { autoClose: 3000 });
            reset();
            setValue("file", "");
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message,{autoClose:3000});
            if (error?.response?.data?.message === "login first or token expired") {
              if (sessionStorage?.getItem("token")) {
                sessionStorage?.removeItem("token");
              }
              navigate("/login");
            }
          });
      }).catch(error=>{
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      })

   
  };
  return (
    <Box>
      {loadExam ? (
        <Box sx={{ textAlign: "center", marginTop: "7vh" }}>
          <Grid container spacing={4} justifyContent="center">
            {[...Array(3)].map(
              (
                _,
                index // Show 3 skeletons as placeholders
              ) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton
                        variant="rectangular"
                        height={48}
                        sx={{ marginTop: 2 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {exam?.length === 0 ? (
            <Typography variant="body1" marginTop="10%" marginBottom="5%">
              Exams will be displayed here.
            </Typography>
          ) : (
            exam?.length === 0 ? (
              <Typography variant="body1" marginTop="10%" marginBottom="5%">
                Dpp will be displayed here.
              </Typography>
            ):( 
            exam?.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: 2,
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "fit-content",
                    position: "relative",
                    display: "flex", // Align content horizontally
                    alignItems: "center", // Center vertically
                    padding: "8px",
                    backgroundColor: "#f0f0f0", // Light background
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      marginRight: "25px",
                      marginLeft: "10px",
                      color: "blueviolet",
                    }}
                  >
                    #{index + 1}
                  </span>
                  {/* <Box
                    sx={{
                      minWidth: "40px",
                      minHeight: "40px",
                      backgroundColor: "#d32f2f", // Red background to resemble PDF
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "12px", // Space between icon and title
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      PDF
                    </Typography>
                  </Box> */}

                  {/* Title */}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#333", // Dark text color
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis", // Handle long titles
                      }}
                    >
                      {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Posted At: {dayjs(data?.createdAt).format("Do MMM YYYY")}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                    >
                      <Button
                        variant="standard"
                        onClick={() => handleCardClick1(data)}
                      >
                        view
                      </Button>
                      <Button
                        variant="standard"
                        onClick={(e) => ApplyExamForm(data?._id)}
                      >
                        Apply
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            )))
          )}
        </Grid>
      )}
      {hide && <Dialog
        open={openpdfDialog}
        onClose={handleCloseDialog1}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {/* Container for title, upload button, and submit button */}
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{
              paddingRight: "16px",
              paddingTop: "8px",
              flexWrap: "wrap", // Allow wrapping on smaller screens
            }}
          >
            {/* Dialog Title */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ marginBottom: { xs: "16px", sm: 0 } }}
            >
              <Typography variant="h6" sx={{ wordBreak: "break-all" }}>
                {selectedPdf?.title} {/* Display title */}
              </Typography>
            </Grid>

            {/* Upload Form */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                gap: "16px",
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit1)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  alignItems: "center",
                  width: "100%", // Ensure full width for small screens
                }}
              >
                {/* Upload Button */}
                <Grid item xs={12} sm={6}>
                  <FormControl error={errors?.file} fullWidth>
                    <Button
                      variant="contained"
                      color="primary"
                      component="label"
                      sx={{
                        height: "40px",
                        whiteSpace: "nowrap",
                        width: "100%",
                      }} // Full width for smaller screens
                    >
                      FILE
                      <input
                        hidden
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          setValue("file", e.target.files);
                          setName(e.target.files[0].name);
                        }}
                      />
                    </Button>
                    {errors.file && (
                      <FormHelperText>{errors.file.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ height: "40px", width: "100%" }} // Full width for smaller screens
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent dividers>
          {/* Display PDF in an iframe */}
          {pdfDownload.length === 0 ? (
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1.5rem",
                textAlign: "center", // Center text for smaller screens
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              Wait a moment, your PDF is loading...
            </Typography>
          ) : (
            <iframe
              src={pdfDownload}
              title={selectedPdf?.title}
              width="100%"
              height="500px"
              style={{ border: "none" }}
            />
          )}
        </DialogContent>

        <DialogActions>
          {/* Show uploaded file name if exists */}
          {name && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                marginRight: { xs: "0", sm: "30px" }, // Adjust margin for small screens
                textAlign: "center",
              }}
            >
              Uploaded File Name:{" "}
              {name.length > 10 ? `${name.slice(0, 10)}...` : name}
            </Typography>
          )}

          {/* Download Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#25D366", // WhatsApp-like color for download button
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#1DA354", // Darker shade on hover
              },
              marginLeft: { xs: "0", sm: "16px" }, // Margin for small screens
            }}
            href={pdfDownload} // Download URL
            download={selectedPdf?.title} // Name of the file to be downloaded
          >
            Download PDF
          </Button>

          <Button onClick={handleCloseDialog1} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>}
    </Box>
  );
};
