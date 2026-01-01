import { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = '/dashboard';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-400 flex items-center justify-center">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-96">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-600">Login</h2>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}
        <div className="space-y-8">
          <Input name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin} className="w-full py-4 text-xl">Login</Button>
        </div>
        <p className="text-center mt-6 text-gray-600">Use: admin / 123</p>
      </div>
    </div>
  );
};

export default Login;