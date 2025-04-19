
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Grid3X3, Map as MapIcon, Mic, Heart, Filter } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

// Mock data for items
const MOCK_ITEMS = [
  {
    id: "1",
    title: "Canon EOS DSLR Camera",
    category: "Electronics",
    price: 25,
    distance: 0.8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    title: "Mountain Bike - Trek",
    category: "Sports",
    price: 15,
    distance: 1.2,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3",
    title: "Portable Projector",
    category: "Electronics",
    price: 20,
    distance: 2.5,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1626379953824-12c5a1f2801c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4",
    title: "Camping Tent (4 person)",
    category: "Outdoor",
    price: 18,
    distance: 3.1,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "5",
    title: "Power Drill Set",
    category: "Tools",
    price: 12,
    distance: 0.5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563195799-74943b60fc09?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6",
    title: "Party Speaker System",
    category: "Electronics",
    price: 30,
    distance: 4.2,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80"
  },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState(MOCK_ITEMS);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  // Initialize from search params
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      // Filter items based on search query
      setItems(MOCK_ITEMS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setItems(MOCK_ITEMS);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    setSearchParams(query ? { q: query } : {});
  };

  const handleSaveItem = (itemId: string) => {
    setSavedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const applyFilters = () => {
    let filtered = [...MOCK_ITEMS];
    
    // Apply price filter
    filtered = filtered.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => 
        selectedCategories.includes(item.category)
      );
    }
    
    // Apply distance filter
    if (selectedDistance) {
      const maxDistance = parseInt(selectedDistance);
      filtered = filtered.filter(item => item.distance <= maxDistance);
    }
    
    setItems(filtered);
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar - Filters */}
        <div className="hidden lg:block w-64 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            
            <div className="space-y-2">
              <h4 className="font-medium">Price per day</h4>
              <div className="pt-4 px-1">
                <Slider 
                  value={priceRange} 
                  max={100}
                  step={1}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Category</h4>
              <div className="space-y-2">
                {["Electronics", "Tools", "Outdoor", "Sports"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories(prev => [...prev, category]);
                        } else {
                          setSelectedCategories(prev => 
                            prev.filter(c => c !== category)
                          );
                        }
                      }}
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Distance</h4>
              <div className="space-y-2">
                {["1", "5", "10", "25"].map((distance) => (
                  <div key={distance} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`distance-${distance}`}
                      checked={selectedDistance === distance}
                      onCheckedChange={(checked) => {
                        setSelectedDistance(checked ? distance : null);
                      }}
                    />
                    <label 
                      htmlFor={`distance-${distance}`}
                      className="text-sm cursor-pointer"
                    >
                      &lt; {distance} miles
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={applyFilters} className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                name="search"
                placeholder="Search for items..."
                defaultValue={searchParams.get("q") || ""}
                className="pr-16"
              />
              <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <Mic size={16} />
                </Button>
                <Button type="submit" size="sm" className="h-8">
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Mobile Filter Button */}
          <div className="flex lg:hidden justify-between items-center mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter size={16} />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="space-y-6 py-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Price per day</h4>
                    <div className="pt-4 px-1">
                      <Slider 
                        value={priceRange} 
                        max={100}
                        step={1}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Category</h4>
                    <div className="space-y-2">
                      {["Electronics", "Tools", "Outdoor", "Sports"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories(prev => [...prev, category]);
                              } else {
                                setSelectedCategories(prev => 
                                  prev.filter(c => c !== category)
                                );
                              }
                            }}
                          />
                          <label 
                            htmlFor={`mobile-category-${category}`}
                            className="text-sm cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Distance</h4>
                    <div className="space-y-2">
                      {["1", "5", "10", "25"].map((distance) => (
                        <div key={distance} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-distance-${distance}`}
                            checked={selectedDistance === distance}
                            onCheckedChange={(checked) => {
                              setSelectedDistance(checked ? distance : null);
                            }}
                          />
                          <label 
                            htmlFor={`mobile-distance-${distance}`}
                            className="text-sm cursor-pointer"
                          >
                            &lt; {distance} miles
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={applyFilters} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{items.length} results</span>
            </div>
          </div>

          {/* View Toggle */}
          <Tabs defaultValue="grid" className="mb-6" onValueChange={(value) => setViewMode(value as "grid" | "map")}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center gap-1">
                  <Grid3X3 size={16} />
                  <span>Grid</span>
                </TabsTrigger>
                <TabsTrigger value="map" className="flex items-center gap-1">
                  <MapIcon size={16} />
                  <span>Map</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden lg:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{items.length} results</span>
              </div>
            </div>
          
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 ${savedItems.includes(item.id) ? 'text-red-500' : 'text-white'}`}
                        onClick={() => handleSaveItem(item.id)}
                      >
                        <Heart size={16} fill={savedItems.includes(item.id) ? "currentColor" : "none"} />
                      </Button>
                      <Badge 
                        variant="secondary" 
                        className="absolute bottom-2 left-2"
                      >
                        ${item.price}/day
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold truncate">{item.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground space-x-4 mt-1">
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              <span>{item.distance} mi</span>
                            </div>
                            <div className="flex items-center">
                              <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-xl font-medium">No items found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="map" className="mt-6">
              <div className="h-[600px] bg-muted rounded-md flex items-center justify-center">
                <div className="text-center">
                  <MapIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">Map View</p>
                  <p className="text-sm text-muted-foreground">
                    Interactive map would be displayed here
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Search;
