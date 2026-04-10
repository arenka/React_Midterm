import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../data/products';

const sliderItems = [
  { title: "Geleceğin Yazılım Donanımları", image: "/images/slider1.jpg" },
  { title: "NovaPro Mekanik Seri", image: "/images/slider2.jpg" }, 
  { title: "Ergonomik Çalışma Alanları", image: "/images/slider3.jpg" }
];

export default function Home() {
  const products = getAllProducts();
  
  // Slider State'i
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = sliderItems.length;

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
            transition: 'background-image 0.5s ease-in-out', // Yumuşak geçiş efekti
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

      <Container sx={{ py: 6, maxWidth: '1200px' }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Öne Çıkan Ürünler
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 4 
        }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}