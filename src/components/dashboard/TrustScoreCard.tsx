
import { Progress } from "@/components/ui/progress"
import { CheckIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react"

interface Verification {
  type: string;
  verified: boolean;
}

interface TrustScoreCardProps {
  score: number;
  verifications: Verification[];
  responseTime: string;
  transactions: number;
  memberSince: string;
}

export const TrustScoreCard = ({
  score,
  verifications,
  responseTime,
  transactions,
  memberSince,
}: TrustScoreCardProps) => {
  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    return "Fair";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-1">Trust Score</h3>
          <div className="text-3xl font-bold mb-2">{score}%</div>
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            {getScoreLabel(score)}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">Updated daily</span>
      </div>

      <Progress value={score} className="h-2 mb-6" />

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Verifications</h4>
          <div className="grid grid-cols-2 gap-2">
            {verifications.map((v) => (
              <div
                key={v.type}
                className={`flex items-center gap-2 p-2 rounded ${
                  v.verified ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"
                }`}
              >
                <CheckIcon className="w-4 h-4" />
                <span className="text-sm">{v.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Response Time</div>
            <div className="font-medium">{responseTime}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Member Since</div>
            <div className="font-medium">{memberSince}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
