export interface ProductReview {
  id?: string;
  author: string;
  rating: number;
  comment?: string;
  pros?: string;
  cons?: string;
  date: Date;
}
