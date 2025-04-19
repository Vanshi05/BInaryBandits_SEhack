
import { Star } from "lucide-react";

export const OwnerInfo = () => {
  const mockOwner = {
    name: "John Doe",
    rating: 4.9,
    transactions: 156,
    memberSince: "Jan 2024"
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
      </div>
      <div>
        <h3 className="font-semibold">{mockOwner.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <Star className="mr-1 h-4 w-4" />
          {mockOwner.rating} • {mockOwner.transactions} rentals
        </div>
        <p className="text-sm text-muted-foreground">
          Member since {mockOwner.memberSince}
        </p>
      </div>
    </div>
  );
};
