
interface ItemFeaturesProps {
  features: string[];
}

export const ItemFeatures = ({ features }: ItemFeaturesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Features:</h3>
      <ul className="list-disc list-inside space-y-2">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};
