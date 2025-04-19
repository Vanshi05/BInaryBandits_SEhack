import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type CardSize = 'small' | 'medium' | 'large';

interface CardProps {
  title: string;
  size: CardSize;
  category: string;
  children?: React.ReactNode;
  className?: string;
}

interface CardGridProps {
  cards: Omit<CardProps, 'children'>[];
}

const Card = ({ title, size, category, children, className = '' }: CardProps) => {
  // Fix the category parameter to match the expected format in Browse.tsx
  const getCategoryParam = (title: string) => {
    // Map card titles to the corresponding category names used in Browse.tsx
    const categoryMap: Record<string, string> = {
      "Tools & Equipment": "Tools",
      "Electronics & Gadgets": "Electronics",
      "Outdoor & Adventure": "Outdoor",
      "Books & Media": "Books & Media",
      "Musical Instruments": "Musical Instruments",
      "Photography Gear": "Photography",
      "Sports Equipment": "Sports",
      "Home & Garden": "Home & Garden"
    };
    
    return categoryMap[title] || title;
  };
  
  return (
    <Link to={`/browse?category=${encodeURIComponent(getCategoryParam(title))}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className={cn(
          "rounded-lg p-6 shadow-md transition-all cursor-pointer",
          "bg-gradient-to-br",
          size === 'small' && "from-cream to-warm-cream row-span-1",
          size === 'medium' && "from-sage/10 to-sage/20 row-span-2",
          size === 'large' && "from-aqua/10 to-aqua/20 row-span-3",
          className
        )}
      >
        <h3 className="text-xl font-semibold mb-4 font-soria text-navy">{title}</h3>
        {children}
      </motion.div>
    </Link>
  );
};

export const CardGrid = ({ cards }: CardGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};