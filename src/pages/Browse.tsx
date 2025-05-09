import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/item-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import UserLocationMap from "@/components/UserLocationMap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Filter, ChevronDown, ArrowUpAZ, ArrowDownAZ, LocateFixed } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/Backend/firebase";
import { NavHeader } from "@/components/nav-header";
import { onAuthStateChanged } from "firebase/auth";

interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  price: number;
  status: string;
  userId: string;
  coordinates?: { lat: number; lng: number };
  createdAt?: any;
  rating?: number;
  distance?: number;
  available?: boolean;
}

const Browse = () => {
  // State management
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<"recommended" | "price-asc" | "price-desc">("recommended");
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Get current user on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch all listings from Firestore
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "listings"));
        
        const listingsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Listing",
            description: data.description || "",
            images: Array.isArray(data.images) && data.images.length > 0 
              ? data.images 
              : ["/placeholder.svg"],
            category: data.category || "Other",
            price: Number(data.price) || 0,
            status: data.status || "available",
            userId: data.userId || "",
            coordinates: data.coordinates || undefined,
            rating: Number(data.rating) || 4.0,
            createdAt: data.createdAt || new Date(),
            distance: data.distance || 0,
            available: data.status === "available"
          };
        });

        setListings(listingsData);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        toast({
          title: "Error",
          description: "Failed to load listings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter and sort listings
  const filteredItems = listings
    .filter(item => {
      // Skip items from the current user
      if (currentUserId && item.userId === currentUserId) return false;
      
      const matchesSearch = searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      const matchesPrice = item.price >= priceRange[0] &&
        item.price <= priceRange[1];

      const matchesAvailability = !availableOnly ||
        item.status === "available";

      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      // Default sort by newest first
      const aTime = a.createdAt?.toMillis?.() || new Date(a.createdAt).getTime() || 0;
      const bTime = b.createdAt?.toMillis?.() || new Date(b.createdAt).getTime() || 0;
      return bTime - aTime;
    });

  // Get unique categories
  const categories = [...new Set(listings.map(item => item.category))];

  // Get user location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Updated",
            description: "Using your current location",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: error.message,
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation not supported by browser",
        variant: "destructive",
      });
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100]);
    setSelectedCategories([]);
    setAvailableOnly(false);
    setSortOrder("recommended");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <NavHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex gap-2 flex-1">
              <Input
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Filter className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {sortOrder === "price-asc" ? <ArrowUpAZ className="h-4 w-4" /> :
                    sortOrder === "price-desc" ? <ArrowDownAZ className="h-4 w-4" /> : null}
                  <span>Sort: {sortOrder.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOrder("recommended")}>
                  Recommended
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("price-asc")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("price-desc")}>
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={getCurrentLocation} className="flex items-center gap-2">
              <LocateFixed className="h-4 w-4" />
              <span>Location</span>
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="bg-background rounded-lg border p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() =>
                          setSelectedCategories(prev =>
                            prev.includes(category)
                              ? prev.filter(c => c !== category)
                              : [...prev, category]
                          )
                        }
                      />
                      <label htmlFor={`cat-${category}`} className="ml-2 text-sm font-medium">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range ($/day)</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <Checkbox
                    id="available-only"
                    checked={availableOnly}
                    onCheckedChange={(checked) => setAvailableOnly(!!checked)}
                  />
                  <label htmlFor="available-only" className="ml-2 text-sm font-medium">
                    Available Only
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            {/* Map Section */}
            <div className="bg-background rounded-lg border overflow-hidden">
              <UserLocationMap
                userLocation={userLocation}
                items={filteredItems}
              />
            </div>

            {/* Items Grid Section */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-background rounded-lg border">
                <h3 className="font-semibold text-lg">No items found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <ItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.images[0]}
                    category={item.category}
                    price={item.price}
                    distance={userLocation && item.coordinates
                      ? `${calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        item.coordinates.lat,
                        item.coordinates.lng
                      ).toFixed(1)} mi`
                      : `${item.distance || 0} mi`}
                    rating={item.rating}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to calculate distance between coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 0.621371; // Convert km to miles
}

export default Browse;