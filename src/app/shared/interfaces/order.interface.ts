import { ContactData } from './contact-data.interface';
import { ProductInCart } from 'src/app/shared/interfaces/product-in-cart.interface';

export interface Order {
  adress: string;
  shipping: string;
  payment: string;
  customerContactData: ContactData;
  receiverContactData: ContactData;
  products: ProductInCart[];
  price: number;
}
