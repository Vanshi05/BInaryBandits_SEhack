
import { motion } from "framer-motion";
import { DollarSign, Leaf, Box } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImpactMetric {
  icon: JSX.Element;
  label: string;
  sublabel: string;
  value: string;
}

export const SustainabilityImpact = () => {
  const metrics: ImpactMetric[] = [
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      label: "Money Saved",
      sublabel: "Instead of buying new",
      value: "$920"
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      label: "CO² Prevented",
      sublabel: "By sharing resources",
      value: "86 kg"
    },
    {
      icon: <Box className="w-6 h-6 text-green-600" />,
      label: "Items Shared",
      sublabel: "Total shared economy items",
      value: "24"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Your Sustainability Impact</h3>
      
      <div className="grid gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="p-3 bg-green-100 rounded-full">
              {metric.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{metric.label}</h4>
              <p className="text-sm text-muted-foreground">{metric.sublabel}</p>
            </div>
            <div className="text-xl font-bold text-green-600">{metric.value}</div>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-6">
        View Detailed Impact
      </Button>
    </div>
  );
};
