import React from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Container, 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQPurchasedCourses = () => {
  const faqs = [
    {
      question: 'How can I access my purchased courses?',
      answer: 'You can access your purchased courses by logging into your account and navigating to the "My Courses" section.'
    },
    {
      question: 'What if I can’t find a purchased course?',
      answer: 'If you cannot find a purchased course, ensure you are logged in with the correct account. If the issue persists, please contact support.'
    },
    {
      question: 'How long do I have access to my purchased courses?',
      answer: 'Typically, you will have lifetime access to your purchased courses, unless otherwise specified in the course details.'
    },
    {
      question: 'Can I download course materials?',
      answer: 'Many courses offer downloadable materials. Check the course dashboard for available resources.'
    },
    {
      question: 'What should I do if I encounter technical issues?',
      answer: 'If you encounter technical issues, please check our troubleshooting guide or reach out to our support team for assistance.'
    },
    {
      question: 'Will I receive updates for the courses I purchased?',
      answer: 'Yes, you will receive updates whenever course content is refreshed or new materials are added.'
    }
  ];

  return (
    <Container sx={{ marginTop: 4, backgroundColor: "#f9f9f9", p: {lg:4,md:4,sm:4,xs:2}, borderRadius: "20px",  }}>
      <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2, color: "#333",textAlign:"center",fontSize:{lg:"2.5rem",md:"2.5rem",sm:"1.8rem",xs:"1.2rem" }}}>
        FAQs for Purchased Courses
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ marginBottom: 2, backgroundColor: "#e3f2fd", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#0d47a1" }} />} sx={{ backgroundColor: "#bbdefb", borderRadius: "10px 10px 0 0", '&:hover': { backgroundColor: "#90caf9" } }}>
            <Typography sx={{ fontWeight: 600, color: "#0d47a1" }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#ffffff", borderRadius: "0 0 10px 10px" }}>
            <Typography sx={{ color: "#555" }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQPurchasedCourses;
