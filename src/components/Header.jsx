import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
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

          <Box>
            <Button component={Link} to="/" sx={{ color: 'text.primary', mr: 2 }}>
              Galeri
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/contact">
              İletişim
            </Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}