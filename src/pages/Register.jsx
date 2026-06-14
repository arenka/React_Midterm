import React from 'react'; // useState'i buradan değil, React.useState olarak kullanacağız
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper, Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  // _s hatasını engellemek için React.useState kullanımına geçtik
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();
    
    // Girilen emailin başındaki ve sonundaki gizli boşlukları temizleyelim
    const cleanEmail = formData.email.trim();

    console.log("Kaydedilen Email:", cleanEmail); // Tarayıcı konsolunda ne gittiğini gör

    if (!cleanEmail || !formData.password) {
      alert("Lütfen email ve şifre alanlarını doldurun.");
      return;
    }

    try {
      // 1. ADIM: Firebase'e Kayıt (Temizlenmiş email ile)
      await createUserWithEmailAndPassword(
        auth, 
        cleanEmail, 
        formData.password
      );

      // 2. ADIM: Backend Kaydı
      const backendUserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: cleanEmail,
        role: 'CUSTOMER'
      };

      await axios.post('http://localhost:8080/api/users/register', backendUserData);

      alert("Kayıt Başarılı!");
      navigate('/login');
    } catch (error) {
      console.error("Firebase Hata Detayı:", error.code);
      if (error.code === 'auth/invalid-email') {
        alert("Hata: Girdiğiniz e-posta adresi geçersiz formatta.");
      } else {
        alert("Hata: " + error.message);
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Yeni Hesap Oluştur
        </Typography>
        
        <Box component="form" onSubmit={handleRegister} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth label="Ad" margin="dense" size="small"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth label="Soyad" margin="dense" size="small"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth label="E-posta Adresi" margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <TextField
            fullWidth label="Şifre" type="password" margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <Button 
            fullWidth variant="contained" color="primary" type="submit" 
            sx={{ mt: 3, py: 1.2, fontWeight: 'bold', borderRadius: 2 }}
          >
            Kayıt Ol
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Zaten hesabınız var mı?{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                Giriş Yap
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}