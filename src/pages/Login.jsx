import React from 'react'; // Hookları React.useState olarak kullanacağız
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Container, TextField, Button, Typography, Box, Paper, Link as MuiLink } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  // Hook hatalarını engellemek için güvenli kullanım
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const fbUser = auth.currentUser;
      const emailVal = fbUser?.email || email;
      // Backend'den kullanıcı adını soyadını alıp ekranda göstermek için çekiyoruz
      const backendUser = await axios.get(`http://localhost:8080/api/users/${emailVal}`);
      const { firstName, lastName } = backendUser.data || {};
      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      alert(`Giriş Başarılı! ${fullName || emailVal}`);
      navigate('/'); // Ana sayfaya yönlendir
    } catch (error) {
      console.error("Giriş hatası:", error);
      // Firebase hata mesajlarını daha temiz göstermek için
      let message = "Giriş yapılamadı.";
      if (error.code === 'auth/user-not-found') message = "Kullanıcı bulunamadı.";
      if (error.code === 'auth/wrong-password') message = "Hatalı şifre.";
      
      alert("Hata: " + message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Giriş Yap
        </Typography>
        
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="E-posta Adresi"
            margin="normal"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <TextField
            fullWidth
            label="Şifre"
            type="password"
            margin="normal"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 'bold', borderRadius: 2 }}
          >
            Giriş
          </Button>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="body2">
              Hesabınız yok mu?{' '}
              <MuiLink component={Link} to="/register" sx={{ fontWeight: 'bold', textDecoration: 'none' }}>
                Kayıt Ol
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}