// src/components/owner-info.tsx
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Backend/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserProfile {
  displayName?: string;
  email?: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt?: any;
}

export const OwnerInfo = ({ userId }: { userId: string }) => {
  const [ownerData, setOwnerData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        setLoading(true);
        
        // Fetch from Firestore users collection
        const userDoc = await getDoc(doc(db, "users", userId));
        
        if (userDoc.exists()) {
          setOwnerData(userDoc.data() as UserProfile);
        } else {
          // Fallback to minimal data if profile doesn't exist
          setOwnerData({
            displayName: "Item Owner",
            email: undefined
          });
        }
      } catch (error) {
        console.error("Error fetching owner data:", error);
        setOwnerData({
          displayName: "Item Owner",
          email: undefined
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, [userId]);

  const getUserInitials = (name?: string) => {
    if (!name) return "O";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return <div className="text-center py-4">Loading owner information...</div>;
  }

  return (
    <div className="border border-sage/20 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={ownerData?.photoURL || undefined} />
          <AvatarFallback className="bg-sage text-cream">
            {getUserInitials(ownerData?.displayName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">
            {ownerData?.displayName || "Item Owner"}
          </h3>
          <p className="text-sm text-gray-500">
            Member since {ownerData?.createdAt?.toDate?.()?.toLocaleDateString() || "recently"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {ownerData?.email && (
          <div>
            <h4 className="font-medium text-gray-700">Contact Information</h4>
            <p className="text-sm text-gray-600 mt-1">
              {ownerData.email}
            </p>
            {ownerData.phoneNumber && (
              <p className="text-sm text-gray-600 mt-1">
                {ownerData.phoneNumber}
              </p>
            )}
          </div>
        )}

        <Button variant="outline" className="w-full border-sage text-sage">
          Contact Owner
        </Button>

        <div className="pt-4 border-t border-sage/20">
          <h4 className="font-medium text-gray-700">Trust & Verification</h4>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <span>✅ Email verified</span>
            {ownerData?.phoneNumber && <span>✅ Phone verified</span>}
          </div>
        </div>
      </div>
    </div>
  );
};