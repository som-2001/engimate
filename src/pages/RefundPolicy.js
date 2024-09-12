import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const RefundPolicy = () => {
  return (
    <Box style={{ overflowX: "hidden", fontFamily: "math" }}>
      <Navbar />

      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: `url(../images/banner3.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: { xs: "8vw", lg: "2vw", md: "2vw" },
          paddingBottom: "15vw",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay with opacity
            zIndex: 1,
          },
        }}
      >
        <Grid
          container
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            padding: { xs: "20px", sm: "20px", md: "50px" },
          }}
        >
          <Grid item xs={12} sm={12} lg={6} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.4rem",
                  md: "2.6rem",
                  lg: "2.6rem",
                },
                marginTop: { xs: "20px", md: "80px" },
                fontWeight: "bold",
                color: "white",
              }}
            >
              Refund Policy
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.2rem",
                },
                marginTop: "10px",
                fontWeight: "500",
                padding: { xs: "10px", sm: "10px", md: "0px" },
                color: "white",
                lineHeight: 1.6,
              }}
            >
              A strong refund policy is not just a safety net for customers—it's
              a reflection of a company's confidence in the quality of its
              products and services.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ padding: { lg: "50px", xs: "20px", sm: "20px", md: "40px" } }}>
        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            1. Overview
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: "#555", marginBottom: "20px", lineHeight: 1.8 }}
          >
            Lyss Technology Pvt. Ltd. ("Lyss Technology," "we," or "us") is
            committed to providing high-quality educational content and other
            solutions. We value our customers and strive to provide exceptional
            services. However, we understand that sometimes circumstances may
            require you to seek a refund. This refund policy outlines the terms
            and conditions governing refunds for various services offered by our
            company.
          </Typography>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            2. Eligibility for Refunds
          </Typography>

          <Box sx={{ marginLeft: "20px" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "8px" }}
            >
              2.1 Hardware and Software Products
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555", lineHeight: 1.8 }}
            >
              <strong>Software Licenses:</strong> If you have purchased a
              software license from Lyss Technology, you may be eligible for a
              refund within 30 days from the date of purchase. Refunds are
              subject to the following conditions:
            </Typography>
            <ul style={{ marginLeft: "20px", marginBottom: "10px" }}>
              <li>The software has not been activated or used.</li>
              <li>You provide a valid reason for the refund request.</li>
              <li>
                Refund requests must be submitted in writing to our customer
                support team at{" "}
                <a href="mailto:support@lyss.in">support@lyss.in</a>.
              </li>
              <li>Refunds will be processed within 10 business days.</li>
            </ul>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555", marginTop: "10px", lineHeight: 1.8 }}
            >
              <strong>Custom Software Development:</strong> Refunds for custom
              software development projects will be considered on a case-by-case
              basis.
            </Typography>

            <ul style={{ marginLeft: "20px", marginBottom: "10px" }}>
              <li>
                If the project scope changes significantly or if there are
                unforeseen technical limitations, you may be eligible for a
                partial refund.
              </li>
              <li>
                Our project manager will assess the situation and determine the
                refund amount.
              </li>
            </ul>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555", marginTop: "10px", lineHeight: 1.8 }}
            >
              <strong>Hardware Development:</strong> Refunds related to hardware
              development (e.g., prototypes, embedded systems) will be evaluated
              based on project milestones and deliverables.
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555", marginTop: "10px", lineHeight: 1.5 }}
            >
              If project goals are not met due to technical issues or other
              valid reasons, a partial refund may be granted.
            </Typography>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              2.2 EdTech Services
            </Typography>

            <Box sx={{ marginLeft: "20px" }}>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.8 }}
              >
                <strong>Online Courses and Training Programs:</strong> Our
                online courses come with a satisfaction guarantee. If you have
                enrolled in any of our online courses or training programs and
                you are not satisfied with the course content, you can request a
                refund within 5 days of enrollment. To initiate a refund, please
                contact our support team.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.8 }}
              >
                <strong>Subscription Services:</strong> For subscription-based
                services (e.g., monthly or annual subscriptions), you can cancel
                your subscription at any time. Refunds for unused portions of
                the subscription period will be prorated.
              </Typography>

              <strong style={{ color: "#555", lineHeight: 1.8 }}>
                Eligibility for a refund is subject to the following conditions:
              </strong>
              <ul style={{ marginLeft: "20px", marginBottom: "10px" }}>
                <li>
                  You have not completed more than 15% of the course content.
                </li>
                <li>
                  Refund requests must be submitted in writing to our customer
                  support team at{" "}
                  <a href="mailto:support@lyss.in">support@lyss.in</a>.
                </li>
                <li>Refunds will be processed within 10 business days.</li>
              </ul>

              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.8 }}
              >
                <strong>Placement Services:</strong> If you have availed our
                placement services and are unsatisfied with the results, you may
                request a refund within 14 days from the date of placement.
              </Typography>
              <ul style={{ marginLeft: "20px", marginBottom: "10px" }}>
                <li>You must provide valid reasons for the refund request.</li>
                <li>
                  Refund requests should be communicated to our placement
                  coordinator.
                </li>
                <li>
                  Refunds will be processed after a thorough review of the
                  placement process.
                </li>
              </ul>
            </Box>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              2.3 Company Registration and Compliance Services
            </Typography>

            <Box sx={{ marginLeft: "20px" }}>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.8 }}
              >
                <strong>Company Registration: </strong>Once the company
                registration process has commenced, refunds are not applicable.
                If there are errors or delays caused by Lyss Technology during
                the registration process, corrective measures will be taken, but
                no monetary refunds will be provided.
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.8 }}
              >
                <strong>Compliance Services:</strong> Refunds for
                compliance-related services (e.g., tax filings, legal
                documentation) will be considered only if errors occur due to
                our negligence. Clients must promptly report any discrepancies
                to our compliance team.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              2.4 Startup Awareness and Mentorship Program
            </Typography>

            <Box sx={{ marginLeft: "20px" }}>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.8 }}
              >
                <strong>Startup Workshops and Awareness Programs:</strong>{" "}
                Refunds for workshop registrations will be granted if requested
                at least 5 days before the scheduled workshop date. No refunds
                will be provided for no-shows or cancellations made within 5
                days of the workshop.
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.8 }}
              >
                <strong>Mentorship Programs:</strong> If you are dissatisfied
                with the mentorship program, you may request a refund within 3
                days of program initiation. Refund requests should be directed
                to our mentorship coordinator.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* More sections can follow the same pattern */}

        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            3. Non-Refundable Items
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: "#555", lineHeight: 1.8, marginBottom: "20px" }}
          >
            <strong>The following items/services are non-refundable:</strong>
          </Typography>
          <ul style={{ marginLeft: "20px", marginBottom: "10px" }}>
          <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.2 }}
              >
                <strong>Downloadable Software: </strong>{" "}
                Once you have downloaded and activated our software, it becomes non-refundable.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.2 }}
              >
                <strong>Custom Development Services</strong>{" "}
                Any custom software development services provided by Lyss Technology are non-refundable.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ color: "#555", lineHeight: 1.2 }}
              >
                <strong>Completed Services:</strong>{" "}
                Any service that has been fully delivered or utilized cannot be refunded.
              </Typography>
          </ul>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
           4. How to Request a Refund
          </Typography>

          <Box sx={{ marginLeft: "20px" }}>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555", lineHeight: 1.8 }}
            >
              <strong>To request a refund, follow these steps:</strong>
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555", lineHeight: 1.8 }}
            >
              <ul style={{ marginLeft: "20px" }}>
                <li>Contact our customer support team at support@lyss.in.</li>
                <li>
                  Provide your order details, including the product or service
                  for which you are requesting a refund.
                </li>
                <li>Explain the reason for your refund request.</li>
              </ul>
            </Typography>
          </Box>
        </Box>

        <Box >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
           5. Exceptions
          </Typography>

          <Box sx={{ marginLeft: "20px" }}>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555",  }}
            >
              <strong>In exceptional cases, Lyss Technology reserves the right to deny a refund if:</strong>
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555", lineHeight: 1.8 }}
            >
              <ul style={{ marginLeft: "20px" }}>
                <li>There is evidence of misuse or violation of our terms of service.</li>
                <li>
                The refund request is made after the specified refund period.
                </li>
                <li>The product or service has been substantially utilized.</li>
              </ul>
            </Typography>
          </Box>
        </Box>

        <Box >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
           6. Contact Us
          </Typography>

          <Box sx={{ marginLeft: "20px" }}>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: "#555", lineHeight: 1.8 }}
            >
              If you have any questions or need assistance regarding refunds, please reach out to our customer support team at support@lyss.in. We are here to help!
            </Typography>

          
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
