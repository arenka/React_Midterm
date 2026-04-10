import React from 'react';
import { Container, Typography, Box, TextField, Button, Grid, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

export default function Contact() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 6 }}>
        Bizimle <Box component="span" sx={{ color: 'primary.main' }}>İletişime</Box> Geçin
      </Typography>

      <Grid container spacing={6}>
        {/* Sol Taraf: İletişim Bilgileri */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ 
            p: 4, 
            height: '100%', 
            backgroundColor: 'background.paper', 
            border: '1px solid rgba(0, 229, 255, 0.1)', 
            borderRadius: 2 
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
              İletişim Bilgileri
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <LocationOnIcon sx={{ color: 'primary.main', mr: 2, fontSize: 32 }} />
              <Typography variant="body1" color="text.secondary">
                Topkapı Üniversitesi Teknoloji Kampüsü<br/>
                İstanbul, Türkiye
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <EmailIcon sx={{ color: 'primary.main', mr: 2, fontSize: 32 }} />
              <Typography variant="body1" color="text.secondary">
                hello@novasetup.com
              </Typography>
            </Box>

            <Box sx={{ mt: 6, p: 2, borderLeft: '3px solid #00e5ff', backgroundColor: 'rgba(0, 229, 255, 0.05)' }}>
              <Typography variant="body2" color="text.secondary">
                Destek ekibimiz 7/24 hizmet vermektedir. Kurumsal satın alımlar ve sponsorluklar için lütfen formu doldurun.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Sağ Taraf: İletişim Formu */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ 
            p: 4, 
            backgroundColor: 'background.paper', 
            border: '1px solid rgba(0, 229, 255, 0.1)', 
            borderRadius: 2 
          }}>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Adınız Soyadınız" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="E-posta Adresiniz" type="email" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Konu" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Mesajınız" variant="outlined" multiline rows={5} />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    endIcon={<SendIcon />} 
                    fullWidth 
                    sx={{ mt: 2, py: 1.5, fontSize: '1.1rem' }}
                  >
                    Mesajı Gönder
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}