
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string
  itemCount: number
  icon: LucideIcon
  bgColor: string
  iconColor: string
  to: string
}

export const CategoryCard = ({ 
  title, 
  itemCount, 
  icon: Icon,
  bgColor,
  iconColor,
  to
}: CategoryCardProps) => {
  return (
    <Link 
      to={to}
      className={`relative block aspect-[4/3] rounded-xl overflow-hidden group transition-transform hover:scale-102 ${bgColor}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-white/80">{itemCount} items</p>
        </div>
      </div>
    </Link>
  );
};
