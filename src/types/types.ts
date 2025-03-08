export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  isLiked: boolean;
  price: number;
}
export interface CartItem extends Product {
  quantity: number;   
  totalPrice?: number;
}