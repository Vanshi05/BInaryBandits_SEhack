import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/Backend/firebase";
import { signOut } from "firebase/auth"; // Don't forget to import signOut
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavHeader = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) return null;

  // Get user initials for fallback avatar
  const getUserInitials = () => {
    if (!user?.displayName) return "U";
    return user.displayName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();
  };

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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-sage/10 gap-2">
                  {/* User avatar with fallback */}
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-sage text-cream">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  {/* Show name if available, otherwise email prefix */}
                  <span className="hidden md:inline text-sage">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              className="bg-sage hover:bg-navy text-cream transition-colors"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          )}

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