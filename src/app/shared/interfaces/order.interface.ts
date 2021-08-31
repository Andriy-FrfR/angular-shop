import { ContactData } from './contact-data.interface';
import { ProductInCart } from 'src/app/shared/interfaces/product-in-cart.interface';

export interface Order {
  email: string;
  adress: string;
  shipping: string;
  shippingPrice: string;
  payment: string;
  customerContactData: ContactData;
  receiverContactData: ContactData;
  products: ProductInCart[];
  price: number;
  date: Date;
  status: string;
}
