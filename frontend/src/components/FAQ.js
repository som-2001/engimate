import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container } from '@mui/material';
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
    <Container sx={{ marginTop: 4,backgroundColor:"#fdfafa",p:4,borderRadius:"20px" }}>
      <Typography variant="h4" gutterBottom>
        FAQs
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{marginBottom:"40px",backgroundColor:"#e9f5ff"}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{backgroundColor:"#ffffff"}}>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQReferEarn;
