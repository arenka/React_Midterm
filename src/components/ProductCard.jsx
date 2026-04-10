import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#151515', 
      border: '1px solid #333'
    }}>
      
      {/* Resimler tam olarak aynı boyutta kesilecek */}
      <CardMedia
        component="img"
        height="250" 
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> 
        <Typography gutterBottom variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          {product.name}
        </Typography>
        
        <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
          {product.description}
        </Typography>
        
        {/* Fiyat ve Butonu en alta itiyoruz */}
        <Typography variant="h6" sx={{ color: '#00e5ff', mt: 'auto' }}>
          {Number(product.price).toLocaleString('tr-TR')} ₺
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2 }}>
        <Button fullWidth variant="contained" color="primary" component={Link} to={`/products/${product.id}`}>
          İncele
        </Button>
      </CardActions>
    </Card>
  );
}