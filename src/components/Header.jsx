import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, Badge, IconButton } from '@mui/material';
import axios from 'axios';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // İkonu eklemeyi unutma
import { useCart } from '../context/CartContext'; // Context'i import et

export default function Header() {
  // HATANIN ÇÖZÜMÜ BURASI: cart değişkenini context'ten çekiyoruz
  const { cart } = useCart();
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    let unsubscribe = null;

    // İlk render anında mevcut kullanıcıyı al
    if (auth.currentUser?.email) {
      setFullName(auth.currentUser.email);
    }

    unsubscribe = auth.onAuthStateChanged(async (fbUser) => {
      if (!fbUser?.email) {
        setFullName('');
        return;
      }

      const email = fbUser.email;
      try {
        const res = await axios.get(`http://localhost:8080/api/users/${email}`);
        const { firstName, lastName } = res.data || {};
        const name = [firstName, lastName].filter(Boolean).join(' ');
        setFullName(name || email);
      } catch (e) {
        console.error('Kullanıcı adı alınamadı:', e);
        setFullName(email);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);



  return (
    <AppBar position="sticky" color="default" sx={{ borderBottom: '1px solid rgba(0,229,255,0.1)', background: '#121212' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 800,
              letterSpacing: '.1rem',
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            TOPKAPI ÜNİVERSİTESİ
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button component={Link} to="/" sx={{ color: 'text.primary', mr: 2 }}>
              Galeri
            </Button>
            
            <Button component={Link} to="/contact" sx={{ color: 'text.primary', mr: 2 }}>
              İletişim
            </Button>

            {fullName && (
              <Button component={Link} to="/my-orders" sx={{ color: 'text.primary', mr: 2 }}>
                Siparişlerim
              </Button>
            )}

            {/* SEPET İKONU */}
            <IconButton component={Link} to="/cart" sx={{ color: 'primary.main', mr: 2 }}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Button 
              component={Link} 
              to={fullName ? '/admin' : '/login'} 
              sx={{ color: 'primary.main', mr: 1, fontWeight: 'bold' }}
            >
              {fullName ? fullName : 'Giriş Yap'}
            </Button>

            {fullName ? (
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  try {
                    await signOut(auth);
                    window.location.href = '/';
                  } catch (e) {
                    console.error('Çıkış hatası:', e);
                  }
                }}
                sx={{ borderRadius: '20px', px: 3 }}
              >
                Çıkış Yap
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
                sx={{ borderRadius: '20px', px: 3 }}
              >
                Kayıt Ol
              </Button>
            )}

          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}