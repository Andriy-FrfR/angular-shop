import { Order } from './order.interface';
import { ProductInCart } from './product-in-cart.interface';
export interface UserData {
  id?: string;
  name: string;
  surname: string;
  email: string;
  number: string;
  city?: string;
  adress?: string;
  productsInCart?: ProductInCart[];
  orders?: Order[] ;
}
