const products = [
  {
    id: 1,
    name: "NovaPro Mekanik Klavye",
    price: 3450.00,
    description: "Yazılımcılar ve e-sporcular için özel üretilmiş, premium mekanik klavye.",
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80" 
  },
  {
    id: 2,
    name: "Odyssey 34\" Ultra Geniş Monitör",
    price: 18500.00,
    description: "Aynı anda birden fazla kod penceresi açmak için kavisli ekran.",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "ErgoTech Titan Çalışma Koltuğu",
    price: 8900.00,
    description: "Uzun saatler bilgisayar başında kalanlar için ergonomik koltuk.",
    imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80"
  }
];

export const getAllProducts = () => products;
export const getProductById = (id) => products.find(p => p.id === parseInt(id));