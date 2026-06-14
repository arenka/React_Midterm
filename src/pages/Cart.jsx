import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box, IconButton, Divider } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
//import { auth } from '../firebase';


// (pk_test ile başlamalı)
const stripePromise = loadStripe('pk_test_51TfhyVDNylIrMpXU949Aprd9AiHdmpSDbi9bkXZw3OxVcGcwNZc6LGGvo7lrhUhzJXWwmZYmUVFVs0nvPaxma5nQ00s5LFZlV0');

export default function Cart() {
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();

const handleCheckout = async () => {
    try {
      console.log("1. Backend'e istek atılıyor...");
      const response = await axios.post('http://localhost:8080/api/payment/create-checkout-session', {
        totalAmount: totalPrice 
      });

      console.log("2. Backend'den gelen cevap:", response.data);

      // STRIPE'IN YENİ SİSTEMİ: Direkt Backend'den gelen URL'ye gidiyoruz
      if (response.data && response.data.url) {
        console.log("3. Stripe Checkout sayfasına yönlendiriliyor...");
        window.location.href = response.data.url; 
      } else {
        alert("Hata: Backend URL'yi gönderemedi.");
      }

    } catch (err) {
      console.error("Tam Hata Detayı:", err);
      alert("Ödeme başlatılamadı: " + err.message);
    }
  };
  if (cart.length === 0) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>Sepetiniz şu an boş.</Typography>
        <Button variant="contained" component={Link} to="/" sx={{ fontWeight: 'bold' }}>
          Alışverişe Başla
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ color: 'white', mb: 5, fontWeight: 'bold' }}>Sepetim</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <Paper 
              key={item.id} 
              sx={{ 
                p: 2, mb: 2, background: 'rgba(255,255,255,0.03)', color: 'white',
                display: 'flex', alignItems: 'center', border: '1px solid rgba(212,175,55,0.1)'
              }}
            >
              <img src={item.imageUrl} alt={item.name} style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }} />
              <Box sx={{ ml: 3, flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="primary.main">{item.quantity} adet x {item.price} ₺</Typography>
              </Box>
              <Typography variant="h6" sx={{ mr: 3 }}>{item.price * item.quantity} ₺</Typography>
              <IconButton onClick={() => removeFromCart(item.id)} sx={{ color: 'error.main' }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Paper>
          ))}
          <Button onClick={clearCart} color="error" sx={{ mt: 2 }}>Sepeti Temizle</Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, background: 'rgba(212,175,55,0.05)', color: 'white', border: '1px solid #d4af37' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Sipariş Özeti</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Ara Toplam</Typography>
              <Typography>{totalPrice} ₺</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Kargo</Typography>
              <Typography color="success.main">Ücretsiz</Typography>
            </Box>
            <Divider sx={{ my: 2, bgcolor: 'rgba(212,175,55,0.3)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h6">Toplam</Typography>
              <Typography variant="h6" color="primary.main">{totalPrice} ₺</Typography>
            </Box>
            
            <Button 
              variant="contained" 
              fullWidth 
              size="large" 
              sx={{ fontWeight: 'bold', py: 2 }}
              onClick={handleCheckout} // ARTIK ÇALIŞIYOR
            >
              ÖDEMEYE GEÇ (STRIPE)
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}