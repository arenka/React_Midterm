import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, CardMedia, Paper, Divider, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { auth } from '../firebase'; // Firebase auth importu şart
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  const { addToCart } = useCart();

  // Sayfa açıldığında verileri getir
  useEffect(() => {
    fetchProductAndComments();
  }, [id]);

  const fetchProductAndComments = async () => {
    try {
      setLoading(true);
      // 1. Ürün Detayını Çek
      const productRes = await axios.get(`http://localhost:8080/api/products/${id}`);
      setProduct(productRes.data);

      // 2. Yorumları Çek
      const commentsRes = await axios.get(`http://localhost:8080/api/comments/product/${id}`);
      setComments(commentsRes.data);
      
      setLoading(false);
    } catch (err) {
      console.error("Veriler yüklenirken hata oluştu:", err);
      setLoading(false);
    }
  };

  // Yorum Gönderme Fonksiyonu
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return alert("Lütfen bir yorum yazın!");

    // Firebase'den giriş yapmış kullanıcıyı kontrol et
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Yorum yapmak için giriş yapmalısınız!");
      return;
    }

    try {
      const commentData = {
        content: newComment,
        rating: newRating,
        productId: parseInt(id),
        userEmail: currentUser.email
      };

      await axios.post('http://localhost:8080/api/comments', commentData);
      
      setNewComment(""); // Kutuyu temizle
      // Listeyi güncellemek için yorumları tekrar çek
      const updatedComments = await axios.get(`http://localhost:8080/api/comments/product/${id}`);
      setComments(updatedComments.data);
      
      alert("Yorumunuz paylaşıldı!");
    } catch (error) {
      console.error("Yorum gönderilemedi:", error);
      alert("Yorum gönderilirken bir hata oluştu.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

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
        {/* Ürün Görseli */}
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={product.imageUrl || 'https://via.placeholder.com/600'}
            alt={product.name}
            sx={{ width: '100%', maxHeight: 600, objectFit: 'cover', borderRadius: 4, boxShadow: '0 8px 32px rgba(212,175,55,0.1)' }}
          />
        </Grid>
        
        {/* Ürün Bilgileri */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>{product.name}</Typography>
          <Typography variant="h4" color="primary.main" gutterBottom sx={{ mb: 4 }}>
            {Number(product.price).toLocaleString('tr-TR')} ₺
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#ccc' }}>
            {product.description}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 4, p: 2, borderLeft: '3px solid #d4af37', bgcolor: 'rgba(255,255,255,0.02)', color: '#aaa' }}>
            Stok Durumu: {product.stockQuantity > 0 ? `${product.stockQuantity} adet mevcut` : 'Tükendi'}
          </Typography>
          
          <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
<Button 
  variant="contained" 
  size="large" 
  fullWidth 
  sx={{ fontWeight: 'bold' }}
  onClick={() => addToCart(product)} // Tıklanınca ürünü gönder
>
  Sepete Ekle
</Button>
            <Button variant="outlined" size="large" component={Link} to="/" fullWidth sx={{ color: 'white', borderColor: 'white' }}>Geri Dön</Button>
          </Box>
        </Grid>
      </Grid>

      {/* YORUMLAR BÖLÜMÜ */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>Müşteri Yorumları</Typography>
        <Divider sx={{ mb: 4, bgcolor: 'rgba(212,175,55,0.3)' }} />
        
        {/* Yorum Yazma Kutusu */}
        <Paper elevation={0} sx={{ p: 3, mb: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Yorum Bırakın</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}

            placeholder={auth.currentUser ? "Ürün hakkındaki görüşlerinizi yazın..." : "Yorum yapmak için giriş yapmalısınız."}
            disabled={!auth.currentUser}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.08)', 
              borderRadius: 1,
              '& .MuiInputBase-input': { color: 'white' }
            }}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {/* YILDIZ PUANI */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const starValue = i + 1;
              const selected = starValue <= newRating;
              return (
                <Button
                  key={starValue}
                  variant="text"
                  onClick={() => setNewRating(starValue)}
                  sx={{
                    minWidth: 40,
                    color: selected ? '#d4af37' : 'rgba(255,255,255,0.35)',
                    fontSize: 26,
                    fontWeight: 'bold'
                  }}
                >
                  ★
                </Button>
              );
            })}
            <Typography sx={{ color: '#bbb', ml: 1 }}>({newRating}/5)</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 

              onClick={handleCommentSubmit}
              disabled={!auth.currentUser}
            >
              Gönder
            </Button>
          </Box>
        </Paper>

        {/* Yorum Listesi */}
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Paper key={index} sx={{ p: 3, mb: 2, background: 'rgba(255,255,255,0.03)', borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : "Misafir Kullanıcı"}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#d4af37', mt: 1, fontWeight: 'bold' }}>
                {comment.rating ? `${comment.rating}/5 ★` : ''}
              </Typography>
              <Typography variant="body2" sx={{ color: '#bbb', mt: 1 }}>
                {comment.content}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography sx={{ color: '#666', fontStyle: 'italic' }}>Henüz yorum yapılmamış. İlk yorumu siz yapın!</Typography>
        )}
      </Box>
    </Container>
  );
}