import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/products';
import { Container, Grid, Typography, Button, Box, CardMedia } from '@mui/material';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="error" gutterBottom>Eser bulunamadı.</Typography>
        <Button variant="contained" component={Link} to="/">Galeriye Dön</Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.imageUrl}
            alt={product.name}
            sx={{ width: '100%', maxHeight: 600, objectFit: 'cover', borderRadius: 4, boxShadow: '0 8px 32px rgba(212,175,55,0.1)' }}
          />
        </Grid>
        
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
          <Typography variant="h4" color="primary.main" gutterBottom sx={{ mb: 4 }}>
            {Number(product.price).toLocaleString('tr-TR')} ₺
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 4, p: 2, borderLeft: '3px solid #d4af37', bgcolor: 'rgba(255,255,255,0.02)' }}>
            {product.details}
          </Typography>
          
          <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
            <Button variant="contained" size="large" fullWidth>Satın Al</Button>
            <Button variant="outlined" size="large" component={Link} to="/" fullWidth>Geri Dön</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}