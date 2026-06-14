import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Link yerine useNavigate aldık
import { useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useCart } from '../context/CartContext';
import { onAuthStateChanged } from 'firebase/auth';


export default function Success() {
  const { clearCart, cart } = useCart();
  const navigate = useNavigate(); // Navigasyon objesini oluşturduk

  useEffect(() => {
    // Stripe redirect sonrası sayfa yenileniyor, bu yüzden auth.currentUser hemen gelmeyebilir.
    // email gelene kadar bekleyip sonra siparişi yazıyoruz.

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        const email = user?.email;
        console.log('[success] auth user changed. email=', email, 'cart=', cart);

        if (!email) {
          console.warn('[success] auth email undefined -> order not saved (waiting)');
          return;
        }

        if (!cart || cart.length === 0) {
          console.warn('[success] cart is empty -> order not saved');
          return;
        }

        console.log('[success] creating order with items=', cart.length);
        await axios.post('http://localhost:8080/api/payment/create-order', {
          totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
          userEmail: email,
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        });
      } catch (err) {
        console.error('Sipariş kaydı başarısız:', err);
      } finally {
        // Sipariş yazılsın/yazılmasın sayfa kapanacak. İstersen burada sadece request başarılı olunca clear et.
        clearCart();
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, clearCart, navigate, cart]);



  return (
    <Container sx={{ py: 10, textAlign: 'center', color: 'white' }}>
      <Typography variant="h3" gutterBottom>Ödeme Başarılı! 🎉</Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>Eseriniz en kısa sürede kargoya verilecektir.</Typography>
      
      {/* onClick ile doğrudan yönlendirme yapıyoruz */}
      <Button 
        variant="contained" 
        onClick={() => navigate('/')} 
        size="large"
      >
        Ana Sayfaya Dön
      </Button>
    </Container>
  );
}