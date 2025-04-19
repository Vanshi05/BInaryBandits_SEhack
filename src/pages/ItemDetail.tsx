import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageGallery } from "@/components/image-gallery";
import { ItemFeatures } from "@/components/item-features";
import { OwnerInfo } from "@/components/owner-info";

// Extended database of items to match all items from Browse page
export const itemsDatabase: Record<string, {
  title: string;
  description: string;
  price: number;
  distance: string;
  features: string[];
  images: string[];
}> = {
  // Tools & Equipment category
  "tools-001": {
    title: "Professional Power Drill",
    description: "High-quality power drill with adjustable settings and long battery life",
    price: 15,
    distance: "2.5 km",
    features: [
      "Variable speed control",
      "Rechargeable lithium-ion battery",
      "Multiple torque settings",
      "Forward and reverse functionality"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "tools-002": {
    title: "Garden Tools Set",
    description: "Complete set of gardening tools including spade, rake, and pruning shears",
    price: 20,
    distance: "1.2 km",
    features: [
      "Ergonomic handles",
      "Durable stainless steel construction",
      "Includes storage bag",
      "Suitable for all garden types"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "tools-003": {
    title: "Electric Chainsaw",
    description: "Powerful electric chainsaw perfect for yard maintenance and tree trimming",
    price: 30,
    distance: "3.8 km",
    features: [
      "14-inch cutting bar",
      "Auto-oiling system",
      "Tool-free chain tensioning",
      "Safety brake system"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },

  // Electronics & Gadgets category
  "camera-001": {
    title: "Professional DSLR Camera",
    description: "Professional grade DSLR camera perfect for photography enthusiasts. Includes multiple lenses and a carrying case.",
    price: 45,
    distance: "2.4 km",
    features: [
      "24.2MP APS-C CMOS Sensor",
      "3.0\" 921k-Dot Vari-Angle LCD Monitor",
      "Full HD 1080p Video Recording at 60 fps",
      "Includes 18-55mm Lens"
    ],
    images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", "/placeholder.svg", "/placeholder.svg"]
  },
  "projector-001": {
    title: "HD Projector",
    description: "High-definition projector perfect for movie nights and presentations",
    price: 40,
    distance: "1.5 km",
    features: [
      "1080p Full HD Resolution",
      "3500 Lumens Brightness",
      "Built-in Speaker",
      "Multiple Input Options"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "electronics-001": {
    title: "Gaming Console",
    description: "Latest gaming console with two controllers and popular games",
    price: 35,
    distance: "1.7 km",
    features: [
      "4K Gaming Support",
      "1TB Storage",
      "Wireless Controllers",
      "Built-in Wi-Fi"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "electronics-002": {
    title: "Bluetooth Speaker",
    description: "Powerful wireless speaker with excellent sound quality and long battery life",
    price: 25,
    distance: "1.9 km",
    features: [
      "360° Sound",
      "Waterproof Design",
      "12-hour Battery Life",
      "Voice Assistant Compatible"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  
  // Outdoor & Adventure category
  "tent-001": {
    title: "Camping Tent",
    description: "4-person camping tent, easy to set up and waterproof. Perfect for weekend getaways.",
    price: 35,
    distance: "3.2 km",
    features: [
      "Sleeps 4 people comfortably",
      "Waterproof material",
      "UV protection",
      "Includes carrying bag"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "kayak-001": {
    title: "Two-Person Kayak",
    description: "Stable and durable kayak, includes paddles and life vests",
    price: 50,
    distance: "4.1 km",
    features: [
      "Stable Design for Beginners",
      "Includes 2 Paddles",
      "2 Life Vests Included",
      "Maximum Weight Capacity: 400 lbs"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "outdoor-001": {
    title: "Hiking Backpack",
    description: "65L hiking backpack with rain cover. Perfect for multi-day treks.",
    price: 25,
    distance: "3.0 km",
    features: [
      "65L Capacity",
      "Internal Frame Support",
      "Multiple Compartments",
      "Integrated Rain Cover"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  
  // Books & Media category
  "book-001": {
    title: "Book Collection",
    description: "Collection of bestselling novels, perfect for a reading retreat",
    price: 10,
    distance: "0.8 km",
    features: [
      "20+ Bestselling Titles",
      "Various Genres",
      "Hardcover and Paperback Options",
      "Adult and Young Adult Selection"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "book-002": {
    title: "Film Collection",
    description: "Classic movie collection with over 50 timeless films on Blu-ray",
    price: 15,
    distance: "1.5 km",
    features: [
      "50+ Classic Films",
      "Blu-ray Format",
      "Special Edition Versions",
      "Behind-the-Scenes Content"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "book-003": {
    title: "Vinyl Record Collection",
    description: "Curated collection of vintage vinyl records from the 60s and 70s",
    price: 25,
    distance: "2.2 km",
    features: [
      "Original Pressings",
      "Classic Rock and Jazz",
      "Well Maintained",
      "50+ Albums"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  
  // Musical Instruments category
  "guitar-001": {
    title: "Electric Guitar",
    description: "Fender Stratocaster with amp and accessories. Perfect for aspiring musicians.",
    price: 40,
    distance: "2.8 km",
    features: [
      "Fender Stratocaster Model",
      "20W Practice Amp Included",
      "Cable and Strap Included",
      "Tuner and Picks Included"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "music-001": {
    title: "Digital Piano",
    description: "88-key weighted digital piano with stand and sustain pedal",
    price: 45,
    distance: "3.1 km",
    features: [
      "88 Weighted Keys",
      "Adjustable Touch Sensitivity",
      "Built-in Speakers",
      "Multiple Sound Options"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "music-002": {
    title: "Drum Kit",
    description: "Complete acoustic drum set with cymbals and hardware",
    price: 50,
    distance: "3.5 km",
    features: [
      "5-Piece Shell Pack",
      "Hi-Hat and Crash Cymbal",
      "Adjustable Throne",
      "Bass Pedal Included"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  
  // Photography category
  "camera-002": {
    title: "Photography Lighting Set",
    description: "Professional studio lighting equipment for photography",
    price: 30,
    distance: "3.5 km",
    features: [
      "3-Point Lighting Setup",
      "Adjustable Brightness",
      "Softboxes Included",
      "Portable Carrying Case"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "photo-001": {
    title: "Mirrorless Camera",
    description: "High-end mirrorless camera with 4K video capabilities",
    price: 50,
    distance: "2.8 km",
    features: [
      "24MP Sensor",
      "4K Video Recording",
      "Electronic Viewfinder",
      "Wi-Fi and Bluetooth"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "photo-002": {
    title: "Camera Lens Collection",
    description: "Set of professional lenses including wide angle, portrait, and telephoto options",
    price: 45,
    distance: "3.2 km",
    features: [
      "Wide Angle (24mm)",
      "Standard (50mm)",
      "Telephoto (200mm)",
      "Macro Lens"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  
  // Sports Equipment category
  "bike-001": {
    title: "Mountain Bike",
    description: "High-quality mountain bike perfect for weekend adventures. Well-maintained with recent service.",
    price: 25,
    distance: "1.8 km",
    features: [
      "Front suspension",
      "Disc brakes",
      "21-speed gearing",
      "Includes helmet and lock"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "sports-001": {
    title: "Tennis Racket Set",
    description: "Professional tennis racket set with balls and carrying case.",
    price: 15,
    distance: "2.1 km",
    features: [
      "2 Professional-grade Rackets",
      "6 Tennis Balls",
      "Carrying Case",
      "Grip Tape"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "sports-002": {
    title: "Golf Club Set",
    description: "Complete set of golf clubs with bag, ideal for beginners and intermediate players",
    price: 35,
    distance: "2.9 km",
    features: [
      "Full Set of Irons",
      "Driver and Woods",
      "Putter",
      "Golf Bag Included"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  
  // Home & Garden category
  "home-001": {
    title: "Pressure Washer",
    description: "Powerful pressure washer perfect for cleaning driveways, decks, and exteriors",
    price: 30,
    distance: "1.4 km",
    features: [
      "2000 PSI",
      "Multiple Nozzle Tips",
      "25 ft Hose",
      "Detergent Tank"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "home-002": {
    title: "Carpet Cleaner",
    description: "Professional-grade carpet cleaner with upholstery attachments",
    price: 25,
    distance: "1.6 km",
    features: [
      "Deep Cleaning Technology",
      "Large Capacity Tank",
      "Upholstery Attachments",
      "Pet Stain Removal"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  "home-003": {
    title: "Outdoor Furniture Set",
    description: "Elegant patio furniture set perfect for hosting garden parties",
    price: 45,
    distance: "2.0 km",
    features: [
      "Table and 6 Chairs",
      "Weather-resistant Materials",
      "Umbrella Included",
      "Easy Assembly"
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }
};

// Mock user rentals data
export const userRentals = {
  items: ["bike-001"] // Initially rented items
};

const ItemDetail = () => {
  const { id } = useParams<{id: string}>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  // If no id is provided or id doesn't exist in database, show not found
  if (!id || !itemsDatabase[id]) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
        <p className="text-gray-600">The requested item does not exist or has been removed.</p>
      </div>
    );
  }

  // Get item data based on ID parameter
  const itemData = itemsDatabase[id];

  const handleConfirmBooking = () => {
    setOpen(false);
    // Add the current item to user rentals if not already present
    if (!userRentals.items.includes(id)) {
      userRentals.items.push(id);
    }
    toast("Booking Confirmed", {
      description: (
        <div className="space-y-1">
          <div>💚 12 items reused by you</div>
          <div>♻️ 3.5kg carbon saved this month</div>
        </div>
      )
    });
  };

  // Calculate minimum selectable date (today)
  const minSelectableDate = new Date();
  // Set time to start of day to avoid time zone issues
  minSelectableDate.setHours(0, 0, 0, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ImageGallery images={itemData.images} title={itemData.title} />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{itemData.title}</h1>
            <p className="text-2xl font-semibold mt-2">${itemData.price}/day</p>
          </div>
          
          <p className="text-gray-600">{itemData.description}</p>
          
          <ItemFeatures features={itemData.features} />

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Book Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Book Item</DialogTitle>
                <DialogDescription>
                  Select your rental dates and confirm your booking.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < minSelectableDate}
                  className="rounded-md border pointer-events-auto"
                />
                <Button 
                  className="w-full" 
                  onClick={handleConfirmBooking}
                  disabled={!date}
                >
                  Confirm Booking
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">About the Owner</h2>
        <div className="max-w-md">
          <OwnerInfo />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
