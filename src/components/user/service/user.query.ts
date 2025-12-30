let users: any[] = JSON.parse(localStorage.getItem('cafeUsers') || '[]');
if (users.length === 0) {
  users = [
    {
      id: '1',
      name: 'Admin',
      email: 'admin@cafebliss.com',
      role: 'admin',
    }
  ];
  localStorage.setItem('cafeUsers', JSON.stringify(users));
}
const saveUsers = () => {
  localStorage.setItem('cafeUsers', JSON.stringify(users));
};
export const getUsers = () => [...users];
export const addUser = (data: { name: string; email: string; role: string }) => {
  const newUser = {
    id: Date.now().toString(),
    ...data,
  };
  users.push(newUser);
  saveUsers();
};
export const updateUser = (id: string, data: { name: string; email: string; role: string }) => {
  users = users.map(u => u.id === id ? { ...u, ...data } : u);
  saveUsers();
};
export const deleteUser = (id: string) => {
  users = users.filter(u => u.id !== id);
  saveUsers();
};