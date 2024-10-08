import React from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Container, 
  Box 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQReferEarn = () => {
  const faqs = [
    {
      question: 'How does the Refer and Earn program work?',
      answer: 'You can refer your friends and earn rewards when they sign up using your referral link. The more friends you refer, the more you can earn!'
    },
    {
      question: 'How do I refer a friend?',
      answer: 'Go to the Refer and Earn section, copy your unique referral link, and share it with your friends via social media, email, or messaging apps.'
    },
    {
      question: 'What rewards do I get for referring friends?',
      answer: 'You can earn rewards like discount coupons, free access to premium courses, and even cash rewards depending on the program’s current offers.'
    },
    {
      question: 'When will I receive my rewards?',
      answer: 'Once your friend signs up and meets the eligibility criteria, such as completing a course or making a purchase, your rewards will be credited to your account.'
    },
    {
      question: 'Is there a limit to how many friends I can refer?',
      answer: 'No, there is no limit! You can refer as many friends as you like and keep earning rewards for each successful referral.'
    },
    {
      question: 'Can I track my referral progress?',
      answer: 'Yes, you can easily track your referral progress and see how many friends have signed up and the rewards you’ve earned in the Refer and Earn dashboard.'
    }
  ];

  return (
    <Container sx={{ marginTop: 4, backgroundColor: "#f9f9f9", p: {lg:4,md:4,sm:4,xs:2}, borderRadius: "20px",  }}>
      <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2, color: "#333",textAlign:"center",fontSize:{lg:"1.6rem",md:"1.6rem",sm:"1.6rem",xs:"1.2rem" }}}>
        FAQs for Refer & Earn
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

export default FAQReferEarn;
