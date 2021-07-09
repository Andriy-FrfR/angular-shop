export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  subCategory?: string;
  img: string[];
  date?: Date;
}
