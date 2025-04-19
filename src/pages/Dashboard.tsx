
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ItemCard } from "@/components/item-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile } from "@/components/dashboard/UserProfile"
import { TrustScoreCard } from "@/components/dashboard/TrustScoreCard"
import { SustainabilityImpact } from "@/components/dashboard/SustainabilityImpact"

// Import the mock data and rentals
import { itemsDatabase, userRentals } from "../pages/ItemDetail";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-1">
          <UserProfile
            name="Michael Chen"
            location="San Francisco, CA"
            rating={5.0}
            reviews={42}
            itemsListed={24}
            rentals={38}
            earned={1240}
          />
        </div>
        
        <div className="lg:col-span-1">
          <TrustScoreCard
            score={92}
            verifications={[
              { type: "Email", verified: true },
              { type: "Phone", verified: true },
              { type: "ID", verified: true },
              { type: "Social Media", verified: true }
            ]}
            responseTime="< 30 mins"
            transactions={38}
            memberSince="Sep 2022"
          />
        </div>
        
        <div className="lg:col-span-1">
          <SustainabilityImpact />
        </div>
      </div>

      <Tabs defaultValue="listings" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="rentals">My Rentals</TabsTrigger>
        </TabsList>
        <TabsContent value="listings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ItemCard
              id="drill-001"
              title="Power Drill"
              description="Professional grade power drill, perfect for DIY projects"
              image="/placeholder.svg"
              category="Tools"
              hidePrice
              hideDistance
              hideButton
            />
            <ItemCard
              id="tent-001"
              title="Camping Tent"
              description="4-person tent, waterproof and easy to set up"
              image="/placeholder.svg"
              category="Outdoor"
              hidePrice
              hideDistance
              hideButton
            />
          </div>
        </TabsContent>
        <TabsContent value="rentals" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userRentals.items.length > 0 ? (
              userRentals.items.map(itemId => {
                const item = itemsDatabase[itemId];
                return (
                  <ItemCard
                    key={itemId}
                    id={itemId}
                    title={item.title}
                    description={item.description}
                    image="/placeholder.svg"
                    category={item.features[0]}
                    hidePrice
                    hideDistance
                    buttonText="Return due date: Apr 25"
                  />
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No items currently rented.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
