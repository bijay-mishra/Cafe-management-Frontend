interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-black',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-lg font-medium transition ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;