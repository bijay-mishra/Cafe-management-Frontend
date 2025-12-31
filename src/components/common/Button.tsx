// components/common/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-white shadow-2xl',
    secondary: 'bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg',
    outline: 'bg-white/20 backdrop-blur border-2 border-white text-white hover:bg-white/30',
    ghost: 'text-gray-700 hover:text-amber-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-10 py-4 text-lg',
    lg: 'px-6 py-3',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-full
        ${className}
      `.trim()}
    >
      {children}
    </button>
  );
};

export default Button;