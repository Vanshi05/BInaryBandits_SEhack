
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CardProps {
  image: string;
  title: string;
  description: string;
  link?: {
    text: string;
    url: string;
  };
  className?: string;
  index?: number;
}

const Card = ({ image, title, description, link, className, index = 0 }: CardProps) => {
  return (
    <motion.div
      className={cn(
        "flex-shrink-0 w-full md:w-[350px] lg:w-[380px] rounded-lg overflow-hidden bg-white shadow-md transition-all duration-300",
        className
      )}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2 + 0.3
      }}
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
       
        {link && (
          <a href={link.url} className="inline-block">
            <Button variant="outline" className="text-primary hover:bg-primary hover:text-white transition-colors">
              {link.text}
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
