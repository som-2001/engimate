import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function CourseCard({image,text,title}) {
  return (
    <Card sx={{ maxWidth: 345,border:"1px solid white",color:"white" }}>
     
        <CardMedia
          component="img"
          height="140"
          image={`./images/${image}`}
          alt="green iguana"
          
        />
        <CardContent style={{}}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            {text}
          </Typography>
        </CardContent>

    </Card>
  );
}
