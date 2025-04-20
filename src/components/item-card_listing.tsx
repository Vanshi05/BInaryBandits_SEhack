
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price?: number;
  distance?: string;
  rating?: number;
  hidePrice?: boolean;
  hideDistance?: boolean;
  hideButton?: boolean;
  buttonText?: string;
}

export const ItemCard = ({ 
  id,
  title, 
  description, 
  image, 
  category,
  price,
  distance,
  hidePrice,
  hideDistance,
  hideButton,
  buttonText = "Borrow Now"
}: ItemCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            {!hidePrice && price && <p className="text-lg font-semibold">${price}/day</p>}
            {!hideDistance && distance && <p className="text-sm text-muted-foreground">{distance} away</p>}
          </div>
        
        </div>
      </div>
    </Card>
  );
};
