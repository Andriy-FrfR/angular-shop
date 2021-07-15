import { ProductImgObj } from '../../load/shared/interfaces/product-img-obj.interface';
export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  subCategory?: string;
  img: ProductImgObj[];
  date?: Date;
}
