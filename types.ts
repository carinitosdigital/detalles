
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  nombre: string;
  telefono: string;
  para: string;
  direccion: string;
  mensajeTarjeta: string;
  metodoPago: 'Nequi' | 'Daviplata' | 'Datafono' | 'Efectivo' | '';
}
