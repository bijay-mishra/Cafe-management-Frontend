interface CardProps {
  title: string;
  count: number;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, count, link }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h3>
      <p className="text-6xl font-bold text-blue-600 mb-6">{count}</p>
      <a href={link} className="bg-blue-600 text-white px-8 py-4 rounded-lg inline-block font-medium hover:bg-blue-700">
        View {title}
      </a>
    </div>
  );
};

export default Card;