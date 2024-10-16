import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
   // Fixed height for all cards
  border: '1px solid #ddd',
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  overflow: 'hidden', // Ensures content does not overflow the card
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  marginBottom:"20px"
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  height: 180, // Fixed height for the image
  objectFit: 'cover', // Ensures the image covers the space nicely
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '16px',
  height: 'calc(100% - 10px)', // Adjust height to fit within the fixed card height
  overflow: 'hidden', // Ensures text does not overflow the content area
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export default function CourseCard({ image, text, title }) {
  return (
    <StyledCard sx={{height: {lg:405,xs:"fit-content",sm:"fit-content",md:405}}}>
      <CardActionArea>
        <StyledCardMedia
          component="img"
          image={`./images/${image}`}
          alt={title}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#555',marginTop:"15px" }}>
            {text}
          </Typography>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
}
