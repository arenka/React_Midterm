import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Divider, CircularProgress } from '@mui/material';
import axios from 'axios';
import { auth } from '../firebase';

export default function MyOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const email = auth.currentUser?.email;
        if (!email) {
          setOrders([]);
          return;
        }

        const res = await axios.get(`http://localhost:8080/api/orders/by-user/${email}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error('Siparişler yüklenemedi:', err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
        Siparişlerim
      </Typography>
      <Divider sx={{ bgcolor: 'rgba(212,175,55,0.3)', mb: 4 }} />

      {orders.length === 0 ? (
        <Typography sx={{ color: '#bbb', fontStyle: 'italic' }}>
          Henüz siparişiniz yok.
        </Typography>
      ) : (
        orders.map((order) => (
          <Paper
            key={order.id}
            sx={{
              p: 3,
              mb: 2,
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 2,
              border: '1px solid rgba(212,175,55,0.15)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Sipariş #{order.id}
            </Typography>
            <Typography sx={{ color: '#bbb', mt: 1 }}>
              Tarih: {order.orderDate ? new Date(order.orderDate).toLocaleString() : '-'}
            </Typography>
            <Typography sx={{ color: '#bbb', mt: 0.5 }}>
              Toplam: {order.totalAmount ?? 0} TL
            </Typography>

            <Box sx={{ mt: 2 }}>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                    <Typography sx={{ color: 'white' }}>
                      {item.productName || 'Ürün'}
                    </Typography>
                    <Typography sx={{ color: '#bbb' }}>
                      Adet: {item.quantity ?? '-'} | Fiyat: {item.price ?? 0} TL
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
                  Sipariş kalemi bulunamadı.
                </Typography>
              )}
            </Box>
          </Paper>
        ))
      )}
    </Container>
  );
}

