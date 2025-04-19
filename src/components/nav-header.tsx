
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Search, Menu, User } from "lucide-react";

export const NavHeader = () => {
  return (
    <header className="border-b border-sage/20 sticky top-0 z-50 bg-cream/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold font-soria text-navy">ShareForward</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/browse" className="text-sm font-medium text-sage hover:text-navy transition-colors">
            Browse Items
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-sage hover:text-navy transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium text-sage hover:text-navy transition-colors">
            About Us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-sage hover:text-navy hover:bg-sage/10">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="text-sage hover:text-navy hover:bg-sage/10">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            variant="default" 
            className="bg-sage hover:bg-navy text-cream transition-colors" 
            asChild
          >
            <Link to="/share">List an Item</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-sage hover:text-navy hover:bg-sage/10">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
