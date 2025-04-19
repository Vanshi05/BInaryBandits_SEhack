
import { Card } from "./ui/card";
import { Counter } from "./ui/counter-animation";
import { Star, Users, Calendar } from "lucide-react";

interface TrustMetricsProps {
  rating: number;
  transactions: number;
  memberSince: string;
}

export const TrustCard = ({ rating, transactions, memberSince }: TrustMetricsProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">Trust Score</span>
          <span className="ml-auto text-lg font-bold">{rating}/5.0</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <span className="font-semibold">Successful Shares</span>
          <Counter end={transactions} className="ml-auto text-lg font-bold" />
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-500" />
          <span className="font-semibold">Member Since</span>
          <span className="ml-auto text-lg font-bold">{memberSince}</span>
        </div>
      </div>
    </Card>
  );
};
