import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  border: '1px solid #ddd',
  borderRadius: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '16px',
}));

export default function CourseCard({ image, text, title }) {
  return (
    <StyledCard>
      <CardActionArea>
        <StyledCardMedia
          component="img"
          height="140"
          image={`./images/${image}`}
          alt={title}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            {text}
          </Typography>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
}
