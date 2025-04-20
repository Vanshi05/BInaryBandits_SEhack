import { ItemCard } from "@/components/item-card_listing.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { TrustScoreCard } from "@/components/dashboard/TrustScoreCard";
import { SustainabilityImpact } from "@/components/dashboard/SustainabilityImpact";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/Backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavHeader } from "@/components/nav-header";

interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  images: string[];
  status: "available" | "rented" | "unavailable";
  userId: string;
  createdAt: any;
  updatedAt: any;
}

interface Rental {
  id: string;
  listingId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "active" | "completed" | "cancelled";
  createdAt: any;
}

interface UserData {
  displayName: string;
  email: string;
  photoURL?: string;
  metadata: {
    creationTime?: string;
  };
}

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [userRentals, setUserRentals] = useState<Rental[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalRentals: 0,
    trustScore: 0,
    reviewsCount: 0
  });

  // Fetch all user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // 1. Fetch user listings
        const listingsQuery = query(
          collection(db, "listings"), 
          where("userId", "==", user.uid)
        );
        const listingsSnapshot = await getDocs(listingsQuery);

        const listings = listingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Listing[];
        setUserListings(listings);

        // 2. Fetch user rentals (both as renter and owner)
        const rentalsAsRenterQuery = query(
          collection(db, "rentals"),
          where("renterId", "==", user.uid)
        );
        const rentalsAsOwnerQuery = query(
          collection(db, "rentals"),
          where("ownerId", "==", user.uid)
        );

        const [renterSnapshot, ownerSnapshot] = await Promise.all([
          getDocs(rentalsAsRenterQuery),
          getDocs(rentalsAsOwnerQuery)
        ]);

        const rentals = [
          ...renterSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          ...ownerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        ] as Rental[];
        setUserRentals(rentals);

        // 3. Calculate statistics
        const activeListings = listings.filter(l => l.status === "available").length;
        const rentedListings = listings.filter(l => l.status === "rented").length;
        const completedRentals = rentals.filter(r => r.status === "completed").length;
        
        setStats({
          totalEarnings: completedRentals * 100, // Example calculation
          totalRentals: rentals.length,
          trustScore: calculateTrustScore(user, listings.length, rentals.length),
          reviewsCount: 0 // You would fetch this from reviews
        });

        // 4. Set basic user data
        setUserData({
          displayName: user.displayName || "User",
          email: user.email || "",
          photoURL: user.photoURL || undefined,
          metadata: {
            creationTime: user.metadata.creationTime
          }
        });

      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Helper function to calculate trust score
  const calculateTrustScore = (user: any, listingsCount: number, rentalsCount: number) => {
    let score = 50; // Base score
    
    // Add points for verified email
    if (user.emailVerified) score += 10;
    
    // Add points for profile completeness
    if (user.displayName) score += 10;
    if (user.photoURL) score += 5;
    
    // Add points for activity
    score += Math.min(listingsCount, 10); // 1 point per listing up to 10
    score += Math.min(rentalsCount, 10); // 1 point per rental up to 10
    
    return Math.min(score, 100); // Cap at 100
  };

  // Format member since date
  const formatMemberSince = (creationTime?: string) => {
    if (!creationTime) return "Member";
    const date = new Date(creationTime);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Format rental status for display
  const formatRentalStatus = (status: string) => {
    switch (status) {
      case "pending": return "Pending Approval";
      case "active": return "Active Rental";
      case "completed": return "Completed";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  return (
    <>
      <NavHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <UserProfile
              name={userData?.displayName || "User"}
              location={userListings[0]?.location || "Location not set"}
              rating={5.0} // You would fetch this from reviews
              reviews={stats.reviewsCount}
              itemsListed={userListings.length}
              rentals={userRentals.length}
              earned={stats.totalEarnings}
              joinDate={formatMemberSince(user?.metadata?.creationTime)}
              avatarUrl={userData?.photoURL}
            />
          </div>

          <div className="lg:col-span-1">
            <TrustScoreCard
              score={stats.trustScore}
              verifications={[
                { type: "Email", verified: !!user?.emailVerified },
                { type: "Phone", verified: false },
                { type: "ID", verified: false },
                { type: "Social Media", verified: false }
              ]}
              responseTime="< 30 mins"
              transactions={userRentals.length}
              memberSince={formatMemberSince(user?.metadata?.creationTime)}
            />
          </div>

          <div className="lg:col-span-1">
            <SustainabilityImpact 
              itemsListed={userListings.length}
              itemsRented={userRentals.length}
            />
          </div>
        </div>

        <Tabs defaultValue="listings" className="w-full mt-8">
          <TabsList>
            <TabsTrigger value="listings">My Listings ({userListings.length})</TabsTrigger>
            <TabsTrigger value="rentals">My Rentals ({userRentals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="mt-6">
            {loading ? (
              <div className="text-center py-8">Loading your listings...</div>
            ) : userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userListings.map((listing) => (
                  <ItemCard
                    key={listing.id}
                    id={listing.id}
                    title={listing.title}
                    description={listing.description}
                    image={listing.images[0] || "/placeholder.svg"}
                    category={listing.category}
                    price={listing.price}
                    status={listing.status}
                    location={listing.location}
                    createdAt={listing.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't listed any items yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rentals" className="mt-6">
            {loading ? (
              <div className="text-center py-8">Loading your rentals...</div>
            ) : userRentals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userRentals.map((rental) => (
                  <ItemCard
                    key={rental.id}
                    id={rental.listingId}
                    title={`Rental #${rental.id.slice(0, 6)}`}
                    description={`Status: ${formatRentalStatus(rental.status)}`}
                    image="/placeholder.svg" // You might want to fetch listing image
                    status={rental.status}
                    buttonText={`Due: ${new Date(rental.endDate).toLocaleDateString()}`}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">You haven't rented any items yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;