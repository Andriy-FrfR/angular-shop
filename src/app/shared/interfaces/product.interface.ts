import { ProductImgObj } from '../../load/shared/interfaces/product-img-obj.interface';

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
  seller: string;
  date?: Date;
}
