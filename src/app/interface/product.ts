export interface Dimensions {
  height: number;
  width: number;
  depth: number;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Meta {
  [key: string]: any; // Adjust as needed for your meta information
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions; // Using a specific type for dimensions
  warrantyInformation?: string; // Optional properties
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[]; // Optional properties
  returnPolicy?: string; // Optional properties
  minimumOrderQuantity?: number;
  meta?: Meta; // Optional properties
  images: string[];
  thumbnail: string;
}
