import { Button } from "@/components/ui/button";
import { NavHeader } from "@/components/nav-header";
import { TrustCard } from "@/components/trust-card";
import { Counter } from "@/components/ui/counter-animation";
import { Link } from "react-router-dom";
import { CategoryCard } from "@/components/category-card";
import { CardGrid } from "@/components/card-grid/CardGrid";
import { Wrench, BookOpen, Laptop, Tent, Car, Music, Camera, Briefcase } from "lucide-react";
import CardSlider from "@/components/CardSlider/CardSlider";

const categories = [
  {
    title: "Tools & DIY",
    itemCount: 845,
    icon: Wrench,
    bgColor: "bg-[#FFF5F1]",
    iconColor: "text-orange-500",
    to: "/browse/tools"
  },
  {
    title: "Books & Media",
    itemCount: 1203,
    icon: BookOpen,
    bgColor: "bg-[#F1F5FF]",
    iconColor: "text-blue-500",
    to: "/browse/books"
  },
  {
    title: "Electronics",
    itemCount: 752,
    icon: Laptop,
    bgColor: "bg-[#F9F1FF]",
    iconColor: "text-purple-500",
    to: "/browse/electronics"
  },
  {
    title: "Outdoor Gear",
    itemCount: 630,
    icon: Tent,
    bgColor: "bg-[#F1FFF5]",
    iconColor: "text-green-500",
    to: "/browse/outdoor"
  },
  {
    title: "Vehicles",
    itemCount: 145,
    icon: Car,
    bgColor: "bg-[#FFF1F5]",
    iconColor: "text-pink-500",
    to: "/browse/vehicles"
  },
  {
    title: "Musical Instruments",
    itemCount: 386,
    icon: Music,
    bgColor: "bg-[#FFFFF1]",
    iconColor: "text-yellow-600",
    to: "/browse/music"
  },
  {
    title: "Photography",
    itemCount: 294,
    icon: Camera,
    bgColor: "bg-[#F1F5FF]",
    iconColor: "text-blue-500",
    to: "/browse/photography"
  },
  {
    title: "Business Equipment",
    itemCount: 418,
    icon: Briefcase,
    bgColor: "bg-[#F1FFF9]",
    iconColor: "text-teal-500",
    to: "/browse/business"
  }
];

const featuredItems = [
  {
    id: "camera-001",
    title: "Professional DSLR Camera",
    description: "Perfect for weekend photoshoots or special events. Includes two lenses and a carrying case.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: {
      text: "Borrow Now",
      url: "/item/camera-001"
    }
  },
  {
    id: "bike-001",
    title: "Mountain Bike",
    description: "Well-maintained mountain bike, perfect for weekend adventures. Helmet included.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    link: {
      text: "Borrow Now",
      url: "/item/bike-001"
    }
  },
  {
    id: "tent-001",
    title: "Camping Gear Set",
    description: "Complete camping set including tent, sleeping bags, and cooking equipment.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    link: {
      text: "Borrow Now",
      url: "/item/tent-001"
    }
  },
  {
    id: "laptop-001",
    title: "MacBook Pro",
    description: "Latest model MacBook Pro, perfect for creative work or programming projects.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    link: {
      text: "Borrow Now",
      url: "/item/laptop-001"
    }
  },
  {
    id: "drone-001",
    title: "Professional Drone",
    description: "DJI Mavic Air 2 with 4K camera. Perfect for aerial photography and videography.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    link: {
      text: "Borrow Now",
      url: "/item/drone-001"
    }
  },
  {
    id: "tools-001",
    title: "Power Tools Set",
    description: "Complete set of power tools including drill, saw, and sander. Perfect for DIY projects.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    link: {
      text: "Borrow Now",
      url: "/item/tools-001"
    }
  }
];

const Index = () => {
  const gridCards = [
    { 
      title: "Tools & Equipment", 
      size: "medium" as const,
    },
    { 
      title: "Electronics & Gadgets", 
      size: "small" as const,
    },
    { 
      title: "Outdoor & Adventure", 
      size: "medium" as const,
    },
    { 
      title: "Books & Media", 
      size: "small" as const,
    },
    { 
      title: "Musical Instruments", 
      size: "medium" as const,
    },
    { 
      title: "Photography Gear", 
      size: "small" as const,
    },
    { 
      title: "Sports Equipment", 
      size: "medium" as const,
    },
    { 
      title: "Home & Garden", 
      size: "small" as const,
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      <NavHeader />
      
      <section className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe0lMxqbuYNDEzThRPXCFFhk2aDK4PhwKLNybqm8Caq52YOIGg"
            alt="Gradient background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold font-plus-jakarta leading-tight mb-6 text-navy">
                Share Resources,<br />Build Community
              </h1>
              <p className="text-xl text-navy mb-8">
                Borrow what you need, share what you have. Join our community of conscious consumers making a difference, one share at a time.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-sage hover:bg-navy text-warm-cream" asChild>
                  <Link to="/browse">Start Browsing</Link>
                </Button>
                <Button size="lg" className="bg-sage hover:bg-navy text-warm-cream" asChild>
                  <Link to="/share">Share an Item</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://static.superwahm.com/wp-content/uploads/2021/04/Home-Office-Setup-Desk-Chair-and-Bookcase.jpg"
                alt="Modern workspace setup"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-soria text-navy mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-sage max-w-2xl mx-auto">
              Discover a wide range of items available in our sharing community
            </p>
          </div>
          
          <CardGrid cards={gridCards} />
        </div>
      </section>

      <section className="py-16 bg-soft-gray">
        <CardSlider
          title="Featured Items"
          subtitle="Discover our most popular items available for borrowing"
          items={featuredItems}
          autoSlide={true}
          interval={5000}
          visibleCards={{ mobile: 1, tablet: 2, desktop: 3 }}
        />
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <Counter end={5000} className="text-4xl font-bold text-navy" />
              <p className="text-sage">Items Shared</p>
            </div>
            <div className="space-y-2">
              <Counter end={2500} className="text-4xl font-bold text-navy" />
              <p className="text-sage">Active Members</p>
            </div>
            <div className="space-y-2">
              <Counter end={15000} className="text-4xl font-bold text-navy" />
              <p className="text-sage">Successful Rentals</p>
            </div>
            <div className="space-y-2">
              <Counter end={4.9} duration={1500} className="text-4xl font-bold text-navy" />
              <p className="text-sage">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-soft-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-plus-jakarta mb-6 text-dark-brown">Our Story & Impact</h2>
              <p className="text-warm-brown mb-8">
                Discover how our sharing community is making a real difference in 
                reducing waste, lowering carbon emissions, and building stronger 
                connections between people.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-soft-white"
                asChild
              >
                <Link to="/impact">See Our Impact</Link>
              </Button>
            </div>
            <div className="grid gap-6">
              <TrustCard 
                rating={4.9}
                transactions={156}
                memberSince="Jan 2024"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
