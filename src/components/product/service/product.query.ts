import type { Product } from "../schema/product.schema";

let products: Product[] = [
  { id: '1', name: 'Espresso', category: 'Beverages', price: 3.5, description: 'Strong black coffee', active: true },
  { id: '2', name: 'Croissant', category: 'Food', price: 2.5, description: 'Buttery French pastry', active: true },
  { id: '3', name: 'Chocolate Cake', category: 'Desserts', price: 5.0, description: 'Rich chocolate layer cake', active: true },
];

export const getProducts = () => [...products];
export const addProduct = (product: Omit<Product, 'id'>) => {
  const newProduct = { ...product, id: Date.now().toString() };
  products.push(newProduct);
  return newProduct;
};
export const updateProduct = (id: string, updates: Partial<Product>) => {
  products = products.map(p => p.id === id ? { ...p, ...updates } : p);
};
export const deleteProduct = (id: string) => {
  products = products.filter(p => p.id !== id);
};
export const toggleProductActive = (id: string) => {
  products = products.map(p => p.id === id ? { ...p, active: !p.active } : p);
};