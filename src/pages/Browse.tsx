import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ItemCard } from "@/components/item-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import UserLocationMap from "@/components/UserLocationMap";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Filter, MapPin, ChevronDown, ArrowUpAZ, ArrowDownAZ, LocateFixed } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [maxDistance, setMaxDistance] = useState(50)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState<"recommended" | "price-asc" | "price-desc" | "distance" | "rating">("recommended")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  
  const searchParams = new URLSearchParams(window.location.search);
  const categoryFromURL = searchParams.get('category');

  useEffect(() => {
    if (categoryFromURL) {
      console.log("Category from URL:", categoryFromURL);
      setSelectedCategories([categoryFromURL]);
    }
  }, [categoryFromURL]);

  const items = [
    // Tools & Equipment category (at least 3)
    {
      id: "tools-001",
      title: "Professional Power Drill",
      description: "High-quality power drill with adjustable settings and long battery life",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      category: "Tools",
      price: 15,
      distance: 2.5,
      rating: 4.5,
      available: true,
      coordinates: { lat: 37.7835, lng: -122.4256 },
    },
    // ... (rest of your items array remains exactly the same)
    // (I've omitted the full list for brevity, but keep all your existing items)
  ];

  const categories = Array.from(new Set(items.map(item => item.category)))

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          toast({
            title: "Location Updated",
            description: "Using your current location for distance calculation",
          })
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to access your location",
            variant: "destructive",
          })
        }
      )
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      })
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  useEffect(() => {
    if (userLocation) {
      console.log("User location updated:", userLocation);
    }
  }, [userLocation]);

  const filteredItems = items
    .filter(item => 
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
      (item.price >= priceRange[0] && item.price <= priceRange[1]) &&
      (userLocation ? calculateDistance(userLocation.lat, userLocation.lng, item.coordinates.lat, item.coordinates.lng) <= maxDistance : item.distance <= maxDistance) &&
      (!availableOnly || item.available)
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "distance":
          if (userLocation) {
            const distA = calculateDistance(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng);
            const distB = calculateDistance(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng);
            return distA - distB;
          }
          return a.distance - b.distance;
        case "rating":
          return b.rating - a.rating;
        case "recommended":
        default:
          return b.rating - a.rating;
      }
    });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100]);
    setMaxDistance(50);
    setSelectedCategories([]);
    setAvailableOnly(false);
    setSortOrder("recommended");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex gap-2 flex-1">
            <Input
              type="text"
              placeholder="Search items..."
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
                <span>Sort: {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1).replace('-', ' ')}</span>
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
              <DropdownMenuItem onClick={() => setSortOrder("distance")}>
                Distance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("rating")}>
                Highest Rated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={getCurrentLocation} className="flex items-center gap-2">
            <LocateFixed className="h-4 w-4" />
            <span>Current Location</span>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="bg-background rounded-lg border p-4 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button variant="outline" size="sm" onClick={resetFilters}>Reset</Button>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {Array.from(new Set(items.map(item => item.category))).map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)} 
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label 
                      htmlFor={`category-${category}`} 
                      className="ml-2 text-sm font-medium cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range ($ per day)</h3>
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
              <h3 className="font-medium mb-2">Distance (miles)</h3>
              <Slider 
                value={[maxDistance]} 
                min={0}
                max={50}
                step={1}
                onValueChange={(value) => setMaxDistance(value[0])}
                className="my-4"
              />
              <div className="flex justify-between text-sm">
                <span>0 mi</span>
                <span>Within {maxDistance} miles</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Availability</h3>
              <div className="flex items-center">
                <Checkbox 
                  id="available-now" 
                  checked={availableOnly} 
                  onCheckedChange={(checked) => setAvailableOnly(!!checked)}
                />
                <label htmlFor="available-now" className="ml-2 text-sm font-medium cursor-pointer">
                  Available now
                </label>
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
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
              {filteredItems.map((item) => (
                <ItemCard 
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  category={item.category}
                  price={item.price}
                  distance={userLocation 
                    ? `${calculateDistance(userLocation.lat, userLocation.lng, item.coordinates.lat, item.coordinates.lng).toFixed(1)} km` 
                    : `${item.distance} km`}
                  rating={item.rating}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Browse;