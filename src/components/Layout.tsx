
import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const openLoginModal = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLogin={openLoginModal} onSignup={openSignupModal} />
      <main className="flex-1">
        {children}
      </main>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialTab={authModalTab} 
      />
    </div>
  );
};

export default Layout;
