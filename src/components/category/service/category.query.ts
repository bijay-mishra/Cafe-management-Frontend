import type { Category } from "../schema/category.schema";

let categories: Category[] = [
  { id: '1', name: 'Beverages' },
  { id: '2', name: 'Food' },
  { id: '3', name: 'Desserts' },
];

export const getCategories = () => [...categories];
export const addCategory = (name: string) => {
  const newCat = { id: Date.now().toString(), name };
  categories.push(newCat);
  return newCat;
};
export const updateCategory = (id: string, name: string) => {
  categories = categories.map(c => c.id === id ? { ...c, name } : c);
};
export const deleteCategory = (id: string) => {
  categories = categories.filter(c => c.id !== id);
};