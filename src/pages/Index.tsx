
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle2, Camera, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Tools",
    count: 42,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=600&q=80",
    emoji: "🔧" 
  },
  {
    name: "Books",
    count: 67,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    emoji: "📚"
  },
  {
    name: "Gadgets",
    count: 35,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    emoji: "📱"
  },
  {
    name: "Party Gear",
    count: 24,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=600&q=80",
    emoji: "🎉"
  }
];

const testimonials = [
  {
    name: "Priya K.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    quote: "Rented a drill for my shelf - saved me $80!"
  },
  {
    name: "Marco L.",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    rating: 4,
    quote: "Found a projector for movie night, super easy pickup."
  },
  {
    name: "Sarah J.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    quote: "Borrowed camping gear for the weekend. Well maintained!"
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 pt-16 md:pt-24 pb-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  Share More, Waste Less
                </h1>
                <p className="text-xl text-muted-foreground">
                  Borrow everyday items from neighbors in your community
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild>
                  <Link to="/search">Browse Items</Link>
                </Button>
                <Button variant="outline" size="lg">
                  List an Item
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[350px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg">
                <img
                  alt="Community sharing illustration"
                  className="absolute inset-0 object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Trusted Community</p>
                      <p className="text-sm text-muted-foreground">Join 5,000+ members sharing locally</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              How BorrowBuddy Works
            </h2>
            <p className="text-muted-foreground">Simple steps to borrow or lend items in your community</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">List</h3>
              <p className="text-muted-foreground">
                Snap photos & set availability for items you're willing to share
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Book</h3>
              <p className="text-muted-foreground">
                Reserve with secure payments and verified profiles
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Share</h3>
              <p className="text-muted-foreground">
                Meetup for doorstep pickup and return when you're done
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Browse Categories
              </h2>
              <p className="text-muted-foreground">Find what you need from a variety of categories</p>
            </div>
            <Button variant="link" asChild className="hidden md:flex mt-4 md:mt-0">
              <Link to="/search" className="flex items-center">
                View all categories <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(category => (
              <Link key={category.name} to="/search">
                <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                  <div className="relative aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-primary/10 to-secondary/10">
                      {category.emoji}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{category.name}</h3>
                      <span className="text-sm text-muted-foreground">{category.count} items</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex md:hidden justify-center mt-6">
            <Button variant="link" asChild>
              <Link to="/search" className="flex items-center">
                View all categories <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              What Our Community Says
            </h2>
            <p className="text-muted-foreground">Read about experiences from borrowers and lenders</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="absolute top-4 right-4 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 mb-4 mt-2">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-full h-12 w-12"
                    />
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                    </div>
                  </div>
                  <p className="italic">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              Ready to Join the Sharing Economy?
            </h2>
            <p className="text-muted-foreground max-w-[600px] mb-6">
              Start borrowing or lending items today. Save money, reduce waste, and connect with your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link to="/search">Browse Items</Link>
              </Button>
              <Button variant="outline" size="lg">
                List Your First Item
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">© 2025 BorrowBuddy. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
