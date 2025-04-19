
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Star,
  MessageCircle,
  Clock,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ItemDetails {
  id: string;
  title: string;
  category: string;
  condition: number;
  price: number;
  deposit: number;
  description: string;
  images: string[];
  owner: {
    name: string;
    avatar: string;
    rating: number;
    responseTime: string;
  };
  location: string;
}

const mockItem: ItemDetails = {
  id: "1",
  title: "Canon EOS DSLR Camera",
  category: "Electronics",
  condition: 4,
  price: 25,
  deposit: 100,
  description: "Professional DSLR camera with 24.1 megapixels, perfect for photography enthusiasts. Includes 2 lenses, a camera bag, and a tripod. Battery life is excellent and it's been well-maintained.",
  images: [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  ],
  owner: {
    name: "Alex Kim",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    responseTime: "< 1 hour"
  },
  location: "Downtown - 0.8 miles away"
};

const ItemDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  
  const item = mockItem; // In a real app, you'd fetch the item based on the ID
  
  const rentDays = selectedDates.length;
  const subtotal = rentDays * item.price;
  const total = subtotal + item.deposit;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="relative h-[350px] md:h-[450px] rounded-lg overflow-hidden">
            <img
              src={item.images[currentImageIndex]}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft size={18} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight size={18} />
            </Button>
            
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {item.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full">
            View 360° Tour
          </Button>

          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={item.owner.avatar} />
              <AvatarFallback>{item.owner.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium">{item.owner.name}</p>
                <div className="flex items-center">
                  {renderStars(item.owner.rating)}
                  <span className="text-xs ml-1">({item.owner.rating})</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" />
                <span>{item.owner.responseTime} response time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details & Booking */}
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <Badge variant="outline">{item.category}</Badge>
            </div>
            
            <div className="flex items-center mb-4">
              <MapPin size={16} className="mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{item.location}</span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">Condition:</span>
                <div className="flex">
                  {renderStars(item.condition)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.condition === 5
                  ? "Like new"
                  : item.condition === 4
                  ? "Excellent"
                  : item.condition === 3
                  ? "Good"
                  : item.condition === 2
                  ? "Fair"
                  : "Acceptable"}
              </p>
            </div>
            
            <p className="text-muted-foreground mb-4">
              {item.description}
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="calendar">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="calendar">Book Rental</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calendar" className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div className="font-medium text-lg">
                      ${item.price}
                      <span className="text-muted-foreground text-sm">/day</span>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      +${item.deposit} deposit
                    </div>
                  </div>
                  
                  <Calendar
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={setSelectedDates as any}
                    className="rounded-md border"
                  />
                  
                  {selectedDates.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{rentDays} days × ${item.price}</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Security deposit</span>
                        <span>${item.deposit}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {}}
                        >
                          <MessageCircle size={16} className="mr-2" /> Message
                        </Button>
                        <Button 
                          className="flex-1"
                          onClick={() => setBookingModalOpen(true)}
                        >
                          Book Now
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-center text-xs text-muted-foreground mt-2">
                        <Shield size={12} className="mr-1" />
                        <span>Payments protected by BorrowBuddy</span>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="details">
                  <dl className="space-y-4">
                    <div>
                      <dt className="font-medium">Rental Policy</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Must be returned in the same condition. Late returns incur a fee of one extra day per day late.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Deposit Details</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        ${item.deposit} fully refundable deposit will be returned after item inspection.
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium">Cancellation Policy</dt>
                      <dd className="text-muted-foreground text-sm mt-1">
                        Free cancellation up to 24 hours before pickup. After that, the first day's rental fee is non-refundable.
                      </dd>
                    </div>
                  </dl>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
