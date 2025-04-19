import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ItemCard } from "@/components/item-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
    {
      id: "tools-002",
      title: "Garden Tools Set",
      description: "Complete set of gardening tools including spade, rake, and pruning shears",
      image: "/placeholder.svg",
      category: "Tools",
      price: 20,
      distance: 1.2,
      rating: 4.4,
      available: true,
      coordinates: { lat: 37.7831, lng: -122.4165 },
    },
    {
      id: "tools-003",
      title: "Electric Chainsaw",
      description: "Powerful electric chainsaw perfect for yard maintenance and tree trimming",
      image: "/placeholder.svg",
      category: "Tools",
      price: 30,
      distance: 3.8,
      rating: 4.6,
      available: true,
      coordinates: { lat: 37.7845, lng: -122.4350 },
    },
    
    // Electronics & Gadgets category (at least 3)
    {
      id: "camera-001",
      title: "Professional DSLR Camera",
      description: "Professional grade DSLR camera perfect for photography enthusiasts. Includes multiple lenses and a carrying case.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Electronics",
      price: 45,
      distance: 2.4,
      rating: 4.9,
      available: true,
      coordinates: { lat: 37.7833, lng: -122.4167 },
    },
    {
      id: "projector-001",
      title: "HD Projector",
      description: "High-definition projector perfect for movie nights and presentations",
      image: "/placeholder.svg",
      category: "Electronics",
      price: 40,
      distance: 1.5,
      rating: 4.6,
      available: true,
      coordinates: { lat: 37.7648, lng: -122.4200 },
    },
    {
      id: "electronics-001",
      title: "Gaming Console",
      description: "Latest gaming console with two controllers and popular games",
      image: "/placeholder.svg",
      category: "Electronics",
      price: 35,
      distance: 1.7,
      rating: 4.8,
      available: true,
      coordinates: { lat: 37.7647, lng: -122.4201 },
    },
    {
      id: "electronics-002",
      title: "Bluetooth Speaker",
      description: "Powerful wireless speaker with excellent sound quality and long battery life",
      image: "/placeholder.svg",
      category: "Electronics",
      price: 25,
      distance: 1.9,
      rating: 4.7,
      available: true,
      coordinates: { lat: 37.7656, lng: -122.4215 },
    },
    
    // Outdoor & Adventure category (at least 3)
    {
      id: "tent-001",
      title: "Camping Tent",
      description: "4-person camping tent, easy to set up and waterproof. Perfect for weekend getaways.",
      image: "/placeholder.svg",
      category: "Outdoor",
      price: 35,
      distance: 3.2,
      rating: 4.7,
      available: false,
      coordinates: { lat: 37.7694, lng: -122.4862 },
    },
    {
      id: "kayak-001",
      title: "Two-Person Kayak",
      description: "Stable and durable kayak, includes paddles and life vests",
      image: "/placeholder.svg",
      category: "Outdoor",
      price: 50,
      distance: 4.1,
      rating: 4.8,
      available: false,
      coordinates: { lat: 37.8083, lng: -122.4156 },
    },
    {
      id: "outdoor-001",
      title: "Hiking Backpack",
      description: "65L hiking backpack with rain cover. Perfect for multi-day treks.",
      image: "/placeholder.svg",
      category: "Outdoor",
      price: 25,
      distance: 3.0,
      rating: 4.7,
      available: true,
      coordinates: { lat: 37.7692, lng: -122.4864 },
    },
    
    // Books & Media category (at least 3)
    {
      id: "book-001",
      title: "Book Collection",
      description: "Collection of bestselling novels, perfect for a reading retreat",
      image: "/placeholder.svg",
      category: "Books & Media",
      price: 10,
      distance: 0.8,
      rating: 4.3,
      available: true, 
      coordinates: { lat: 37.7691, lng: -122.4449 },
    },
    {
      id: "book-002",
      title: "Film Collection",
      description: "Classic movie collection with over 50 timeless films on Blu-ray",
      image: "/placeholder.svg",
      category: "Books & Media",
      price: 15,
      distance: 1.5,
      rating: 4.5,
      available: true,
      coordinates: { lat: 37.7695, lng: -122.4460 },
    },
    {
      id: "book-003",
      title: "Vinyl Record Collection",
      description: "Curated collection of vintage vinyl records from the 60s and 70s",
      image: "/placeholder.svg",
      category: "Books & Media",
      price: 25,
      distance: 2.2,
      rating: 4.8,
      available: true,
      coordinates: { lat: 37.7699, lng: -122.4445 },
    },
    
    // Musical Instruments category (at least 3)
    {
      id: "guitar-001",
      title: "Electric Guitar",
      description: "Fender Stratocaster with amp and accessories. Perfect for aspiring musicians.",
      image: "/placeholder.svg",
      category: "Musical Instruments",
      price: 40,
      distance: 2.8,
      rating: 4.6,
      available: true,
      coordinates: { lat: 37.7751, lng: -122.4193 },
    },
    {
      id: "music-001",
      title: "Digital Piano",
      description: "88-key weighted digital piano with stand and sustain pedal",
      image: "/placeholder.svg",
      category: "Musical Instruments",
      price: 45,
      distance: 3.1,
      rating: 4.7,
      available: true,
      coordinates: { lat: 37.7758, lng: -122.4198 },
    },
    {
      id: "music-002",
      title: "Drum Kit",
      description: "Complete acoustic drum set with cymbals and hardware",
      image: "/placeholder.svg",
      category: "Musical Instruments",
      price: 50,
      distance: 3.5,
      rating: 4.5,
      available: true,
      coordinates: { lat: 37.7761, lng: -122.4201 },
    },
    
    // Photography category (at least 3)
    {
      id: "camera-002",
      title: "Photography Lighting Set",
      description: "Professional studio lighting equipment for photography",
      image: "/placeholder.svg",
      category: "Photography",
      price: 30,
      distance: 3.5,
      rating: 4.7,
      available: true,
      coordinates: { lat: 37.7609, lng: -122.4350 },
    },
    {
      id: "photo-001",
      title: "Mirrorless Camera",
      description: "High-end mirrorless camera with 4K video capabilities",
      image: "/placeholder.svg",
      category: "Photography",
      price: 50,
      distance: 2.8,
      rating: 4.9,
      available: true,
      coordinates: { lat: 37.7615, lng: -122.4355 },
    },
    {
      id: "photo-002",
      title: "Camera Lens Collection",
      description: "Set of professional lenses including wide angle, portrait, and telephoto options",
      image: "/placeholder.svg",
      category: "Photography",
      price: 45,
      distance: 3.2,
      rating: 4.8,
      available: true,
      coordinates: { lat: 37.7620, lng: -122.4360 },
    },
    
    // Sports Equipment category (at least 3)
    {
      id: "bike-001",
      title: "Mountain Bike",
      description: "High-quality mountain bike perfect for weekend adventures. Well-maintained with recent service.",
      image: "/placeholder.svg",
      category: "Sports",
      price: 25,
      distance: 1.8,
      rating: 4.8,
      available: true,
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    {
      id: "sports-001",
      title: "Tennis Racket Set",
      description: "Professional tennis racket set with balls and carrying case.",
      image: "/placeholder.svg",
      category: "Sports",
      price: 15,
      distance: 2.1,
      rating: 4.5,
      available: true,
      coordinates: { lat: 37.7834, lng: -122.4252 },
    },
    {
      id: "sports-002",
      title: "Golf Club Set",
      description: "Complete set of golf clubs with bag, ideal for beginners and intermediate players",
      image: "/placeholder.svg",
      category: "Sports",
      price: 35,
      distance: 2.9,
      rating: 4.6,
      available: true,
      coordinates: { lat: 37.7838, lng: -122.4258 },
    },
    
    // Home & Garden category (at least 3)
    {
      id: "home-001",
      title: "Pressure Washer",
      description: "Powerful pressure washer perfect for cleaning driveways, decks, and exteriors",
      image: "/placeholder.svg",
      category: "Home & Garden",
      price: 30,
      distance: 1.4,
      rating: 4.5,
      available: true,
      coordinates: { lat: 37.7826, lng: -122.4160 },
    },
    {
      id: "home-002",
      title: "Carpet Cleaner",
      description: "Professional-grade carpet cleaner with upholstery attachments",
      image: "/placeholder.svg",
      category: "Home & Garden",
      price: 25,
      distance: 1.6,
      rating: 4.4,
      available: true,
      coordinates: { lat: 37.7829, lng: -122.4163 },
    },
    {
      id: "home-003",
      title: "Outdoor Furniture Set",
      description: "Elegant patio furniture set perfect for hosting garden parties",
      image: "/placeholder.svg",
      category: "Home & Garden",
      price: 45,
      distance: 2.0,
      rating: 4.7,
      available: true,
      coordinates: { lat: 37.7833, lng: -122.4168 },
    }
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

        <div className="md:col-span-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
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