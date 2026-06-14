import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';


export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    stockQuantity: '',
    imageUrl: '',
    categoryId: '',
  });

  // Backend'den ürünleri ve kategorileri çek
  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('http://localhost:8080/api/products'),
          axios.get('http://localhost:8080/api/categories'),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error('Ürün/kategori yüklenirken hata:', err);
      }
    };

    loadData();
  }, []);

  // Yeni Ürün Ekleme Fonksiyonu
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // backend DTO: price(Double), stockQuantity(Integer), categoryId(Long)
      const payload = {
        ...newProduct,
        price: newProduct.price === '' ? null : Number(newProduct.price),
        stockQuantity: newProduct.stockQuantity === '' ? null : Number(newProduct.stockQuantity),
        categoryId: newProduct.categoryId === '' ? null : Number(newProduct.categoryId),
      };

      await axios.post('http://localhost:8080/api/products', payload);
      alert("Ürün başarıyla eklendi!");
      setNewProduct({ name: '', price: '', imageUrl: '' });
      // Listeyi yenile
      const refresh = await axios.get('http://localhost:8080/api/products');
      setProducts(refresh.data);
    } catch (err) {
      alert("Ürün eklenemedi. Backend açık mı?");
    }
  };

  return (
    <Container sx={{ mt: 5, color: 'white' }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'rgba(255,255,255,0.05)', color: 'white' }}>
        <Typography variant="h5" gutterBottom>Yeni Ürün Ekle (Admin Paneli)</Typography>
        <form onSubmit={handleAddProduct}>
          <TextField
            fullWidth
            label="Ürün Adı"
            margin="normal"
            variant="outlined"
            value={newProduct.name}
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Açıklama"
            margin="normal"
            variant="outlined"
            value={newProduct.description}
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />

          <TextField
            fullWidth
            label="Fiyat (TL)"
            margin="normal"
            type="number"
            value={newProduct.price}
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />

          <TextField
            fullWidth
            label="Stok"
            margin="normal"
            type="number"
            value={newProduct.stockQuantity}
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
          />

          <TextField
            fullWidth
            label="Görsel URL"
            margin="normal"
            value={newProduct.imageUrl}
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />

          <TextField
            fullWidth
            select
            SelectProps={{ native: true }}
            label="Kategori"
            margin="normal"
            value={newProduct.categoryId}
            sx={{ input: { color: 'white' }, label: { color: 'gray' } }}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
          >
            <option value="">Kategori seç</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </TextField>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Ürünü Kaydet
          </Button>
        </form>
      </Paper>

      {/* Mevcut Ürünler Listesi */}
      <TableContainer component={Paper} sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'gold' }}>Görsel</TableCell>
              <TableCell sx={{ color: 'gold' }}>Ürün Adı</TableCell>
              <TableCell sx={{ color: 'gold' }}>Fiyat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell><img src={p.imageUrl} alt={p.name} width="50" /></TableCell>
                <TableCell sx={{ color: 'white' }}>{p.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{p.price} ₺</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Sil"
                    onClick={async () => {
                      const ok = window.confirm(`${p.name} ürününü silmek istiyor musunuz?`);
                      if (!ok) return;
                      try {
                        await axios.delete(`http://localhost:8080/api/products/${p.id}`);
                        setProducts((prev) => prev.filter((x) => x.id !== p.id));
                      } catch (err) {
                        console.error('Ürün silme hatası:', err);
                        alert('Ürün silinemedi. Backend açık mı?');
                      }
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}