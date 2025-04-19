
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
}

const Navbar = ({ onLogin, onSignup }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <div className="text-xl font-bold text-primary">
            BorrowBuddy
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">
            Browse Items
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/search" className="flex items-center gap-1">
              <Search size={16} />
              <span>Search</span>
            </Link>
          </Button>
          <Button variant="ghost" onClick={onLogin}>Log in</Button>
          <Button variant="default" onClick={onSignup}>Sign up</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 border-t bg-background">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/search" 
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse Items
            </Link>
            <Link 
              to="/search" 
              className="flex items-center gap-1 p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search size={16} />
              <span>Search</span>
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" onClick={onLogin}>Log in</Button>
              <Button variant="default" onClick={onSignup}>Sign up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
