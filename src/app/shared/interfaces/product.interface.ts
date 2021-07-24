import { ProductImgObj } from '../../load/shared/interfaces/product-img-obj.interface';
import { Characteristic } from './characteristic.interface';

export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  subCategory?: string;
  amount: number;
  img: ProductImgObj[];
  payment?: string;
  guarantees?: string;
  characteristics?: Characteristic[];
  seller: string;
  weight?: string;
  date?: Date;
}
