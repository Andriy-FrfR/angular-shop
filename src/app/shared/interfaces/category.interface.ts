import { SubCategory } from './sub-category.interface';

export interface Category {
  id?: string;
  title: string;
  subCategories: SubCategory[];
}
