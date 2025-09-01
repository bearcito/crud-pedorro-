export interface Product {
  id: number;
  name: string;
  type: 'simple' | 'variable';
  price: string;
  regular_price: string;
  sale_price?: string;
  images: ProductImage[];
  status: 'publish' | 'draft' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface CreateProductData {
  name: string;
  type: 'simple' | 'variable';
  price?: string;
  regular_price?: string;
  images: { src: string }[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: number;
}
