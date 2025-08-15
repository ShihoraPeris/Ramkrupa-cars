export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Needs Work';
  description: string;
  images: string[];
  contactNumber: string;
  features: string[];
  engineType: string;
  transmission: 'Manual' | 'Automatic';
  exteriorColor: string;
  interiorColor: string;
}

export interface CartItem {
  car: Car;
  quantity: number;
}