export interface ProductsProps {
  products: ProductProps[];
}

export interface ProductProps {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: any;
  discount_price: any;
  discount_percent: any;
  image_link: string;
  is_new: boolean;
  other_images_link: string[];
  category_id: any;
  large_description: string;
  updated_date: any;
  created_date: any;
}
