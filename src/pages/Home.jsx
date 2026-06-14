import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import axios from 'axios'; // BİLGİSAYARLAR ARASI HABERLEŞMEK İÇİN EKLENDİ
import ProductCard from '../components/ProductCard';

const sliderItems = [
  { title: "Geleceğin Yazılım Donanımları", image: "/images/slider1.jpg" },
  { title: "NovaPro Mekanik Seri", image: "/images/slider2.jpg" }, 
  { title: "Ergonomik Çalışma Alanları", image: "/images/slider3.jpg" }
];

export default function Home() {
  // SAHTE VERİ YERİNE GERÇEK STATE'LERİMİZİ OLUŞTURUYORUZ
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Veri gelene kadar dönen yuvarlak için
  
  // Slider State'i
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = sliderItems.length;

  // Sayfa açıldığında GERÇEK veritabanımızdan ürünleri çekiyoruz!
  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data); // Gelen veriyi state'e yaz
        setLoading(false); // Yüklenme bitti
      })
      .catch(error => {
        console.error("Veritabanından ürünler çekilemedi!", error);
        setLoading(false);
      });
  }, []);

  // Otomatik kaydırma (5 saniyede bir)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % maxSteps);
    }, 5000);
    return () => clearInterval(timer); // Component unmount olduğunda temizle
  }, [maxSteps]);

  const handleNext = () => setActiveStep((prev) => (prev + 1) % maxSteps);
  const handleBack = () => setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);

  return (
    <Box>
      {/* SLIDER KISMI (AYNEN KALDI, ÇOK ŞIK!) */}
      <Box sx={{ position: 'relative', width: '100%', height: '450px', overflow: 'hidden' }}>
        <Paper
          sx={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(${sliderItems[activeStep].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-image 0.5s ease-in-out',
            borderRadius: 0
          }}
        >
          <Box sx={{ backgroundColor: 'rgba(0,0,0,0.6)', p: 4, borderRadius: 2 }}>
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              {sliderItems[activeStep].title}
            </Typography>
          </Box>
        </Paper>

        <Button 
          onClick={handleBack} 
          sx={{ 
            position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', 
            color: 'white', bgcolor: 'rgba(0,0,0,0.5)', minWidth: '45px', height: '45px', 
            borderRadius: '50%', fontSize: '1.5rem', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
          }}
        >
          &#10094;
        </Button>
        
        <Button 
          onClick={handleNext} 
          sx={{ 
            position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', 
            color: 'white', bgcolor: 'rgba(0,0,0,0.5)', minWidth: '45px', height: '45px', 
            borderRadius: '50%', fontSize: '1.5rem', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
          }}
        >
          &#10095;
        </Button>
      </Box>

      {/* GERÇEK ÜRÜNLERİN LİSTELENDİĞİ KISIM */}
      <Container sx={{ py: 6, maxWidth: '1200px' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Öne Çıkan Ürünler
        </Typography>

        {/* Veriler yüklenirken ekranda dönen çark çıksın, şık dursun */}
        {loading ? (
           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
             <CircularProgress />
           </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}